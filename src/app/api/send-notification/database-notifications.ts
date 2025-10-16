// Alternative notification system using Supabase real-time
import { supabase } from '../../../utils/supabase/client';

export async function storeNotificationInDatabase(message: string, phone: string, type: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([
        {
          message: message,
          phone_number: phone,
          type: type,
          status: 'pending',
          created_at: new Date().toISOString(),
          priority: type === 'emergency' ? 'high' : 'normal'
        }
      ])
      .select();

    if (error) {
      console.error('Database notification error:', error);
      return false;
    }

  console.debug('Notification stored in database')
    return true;
  } catch (error) {
    console.error('Database storage error:', error);
    return false;
  }
}

// For real-time notifications to admin dashboard
export async function sendRealTimeNotification(message: string, phone: string) {
  try {
    // This would trigger real-time updates for any admin dashboard listening
    const channel = supabase.channel('notifications');
    
    channel.send({
      type: 'broadcast',
      event: 'new_request',
      payload: {
        message,
        phone,
        timestamp: new Date().toISOString(),
        urgent: true
      }
    });

    return true;
  } catch (error) {
    console.error('Real-time notification error:', error);
    return false;
  }
}