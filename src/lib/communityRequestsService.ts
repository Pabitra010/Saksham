import { supabase } from '../utils/supabase/client';

export type CommunityRequest = {
  id?: string;
  message: string;
  category: string; // 'immediate' or community support name
  user_phone?: string;
  user_name?: string;
  user_email?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'high' | 'normal' | 'low';
  location?: string;
  created_at?: string;
  updated_at?: string;
  assigned_to?: string;
  notes?: string;
};

// Store community request in Supabase
export async function storeCommunityRequest(request: CommunityRequest): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const requestData = {
      message: request.message,
      category: request.category,
      user_phone: request.user_phone,
      user_name: request.user_name,
      user_email: request.user_email,
      status: request.status || 'pending',
      priority: request.category === 'immediate' ? 'high' : 'normal',
      location: request.location,
      notes: request.notes
    };

    const { data, error } = await supabase
      .from('community_requests')
      .insert([requestData])
      .select()
      .single();

    if (error) {
      console.error('Error storing community request:', error);
      return { success: false, error: error.message };
    }

  // request stored successfully (debug)
  console.debug('Community request stored')
    return { success: true, data };
  } catch (error: any) {
    console.error('Unexpected error storing community request:', error);
    return { success: false, error: error.message };
  }
}

// Get immediate requests for notifications
export async function getImmediateRequests(): Promise<CommunityRequest[]> {
  try {
    const { data, error } = await supabase
      .from('community_requests')
      .select('*')
      .eq('category', 'immediate')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching immediate requests:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching immediate requests:', error);
    return [];
  }
}

// Get community support requests by category
export async function getCommunityRequestsByCategory(category: string): Promise<CommunityRequest[]> {
  try {
    const { data, error } = await supabase
      .from('community_requests')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching community requests by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching community requests:', error);
    return [];
  }
}

// Update request status
export async function updateRequestStatus(id: string, status: 'pending' | 'in_progress' | 'completed', notes?: string) {
  try {
    const updateData: any = { 
      status, 
      updated_at: new Date().toISOString() 
    };
    
    if (notes) {
      updateData.notes = notes;
    }

    const { data, error } = await supabase
      .from('community_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating request status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Unexpected error updating request status:', error);
    return { success: false, error: error.message };
  }
}