import { NextRequest, NextResponse } from 'next/server';
import { storeCommunityRequest, type CommunityRequest } from '../../../lib/communityRequestsService';
import { createClient } from '@supabase/supabase-js';

// Keep the notification flow simple and reliable:
// 1) store request in Supabase (already done elsewhere),
// 2) insert a notification record in `notifications`,
// 3) broadcast via Supabase realtime channel, fallback to console log.
async function sendNotification(phoneNumber: string, message: string): Promise<boolean> {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Prefer a server-only service role key for privileged server actions.
    // Set SUPABASE_SERVICE_ROLE_KEY in Vercel/production env (do NOT expose this to the client).
    // Fall back to the anon key for local development if service role key is not provided.
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error('Supabase credentials not configured');
  // debug: notification payload
  console.debug('Notification payload prepared')
      return false;
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const payload = {
      phone_number: phoneNumber,
      message,
      type: 'sms',
      status: 'pending',
      created_at: new Date().toISOString(),
      metadata: { source: 'community_support', urgent: true }
    };

    const { data, error } = await supabase.from('notifications').insert([payload]).select().single();
    if (error) {
      console.error('Failed to insert notification:', error.message || error);
  console.debug('Notification (local) payload stored')
      return false;
    }

    // broadcast to channel (best-effort)
    try {
      await supabase.channel('notifications').send({
        type: 'broadcast',
        event: 'new_notification',
        payload: { id: data.id, ...payload }
      });
    } catch (bErr) {
      console.warn('Broadcast failed (notification stored):', (bErr as Error).message || bErr);
    }

    console.info('Notification stored in Supabase, id=', data.id);
    return true;
  } catch (err) {
    console.error('sendNotification failed:', err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, timestamp, type, category, user_name, user_phone, user_email, location } = body;

    // Step 1: Store ALL requests in Supabase first
    const communityRequest: CommunityRequest = {
      message,
      category: category || 'immediate',
      user_phone,
      user_name,
      user_email,
      location,
      status: 'pending'
    };

    const storeResult = await storeCommunityRequest(communityRequest);
    if (!storeResult.success) {
      console.error('Failed to store community request:', storeResult.error);
      return NextResponse.json(
        { error: 'Failed to store request' },
        { status: 500 }
      );
    }

  console.debug('Request stored in database')

    // Step 2: Only send notifications for IMMEDIATE requests
    if (category === 'immediate' || !category) {
      const notificationPhone = process.env.NOTIFICATION_PHONE_NUMBER;
      
      if (!notificationPhone) {
        console.error('NOTIFICATION_PHONE_NUMBER not set in environment variables');
        return NextResponse.json({
          success: true,
          message: 'Request stored successfully (notification not configured)',
          stored: true,
          notified: false
        });
      }

      // Format the notification message
      const notificationMessage = `
🚨 IMMEDIATE COMMUNITY SUPPORT REQUEST

📝 Request: ${message}
⏰ Time: ${new Date(timestamp || new Date()).toLocaleString()}
📱 User Phone: ${user_phone || 'Not provided'}
👤 User Name: ${user_name || 'Not provided'}
📍 Location: ${location || 'Not provided'}

🔥 THIS IS URGENT - PLEASE RESPOND IMMEDIATELY!
      `.trim();

  console.debug('Immediate request notification triggered')
      
      // Send Supabase notification
        const success = await sendNotification(notificationPhone, notificationMessage);
      
      return NextResponse.json({
        success: true,
        message: success 
          ? '✅ Request stored and Supabase notification sent successfully!'
          : '⚠️ Request stored but notification had issues (check console)',
        stored: true,
        notified: success,
        method: 'supabase_realtime',
        phone: notificationPhone
      });
      
    } else {
      // Non-immediate requests: Just store
  console.debug(`Community support request stored: ${category}`);
      return NextResponse.json({
        success: true,
        message: 'Community support request stored successfully',
        category,
        stored: true,
        notified: false,
        note: 'Non-immediate requests are stored for admin review'
      });
    }

  } catch (error) {
    console.error('Error processing notification request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}