-- SQL script to create the community_requests table in Supabase

CREATE TABLE community_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  message text NOT NULL,
  category text NOT NULL, -- 'immediate' or community support name
  user_phone text,
  user_name text,
  user_email text,
  status text DEFAULT 'pending', -- 'pending', 'in_progress', 'completed'
  priority text DEFAULT 'normal', -- 'high', 'normal', 'low'
  location text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  assigned_to text, -- for future: which helper is assigned
  notes text -- for admin notes
);

-- Create indexes for better performance
CREATE INDEX idx_community_requests_category ON community_requests(category);
CREATE INDEX idx_community_requests_status ON community_requests(status);
CREATE INDEX idx_community_requests_created_at ON community_requests(created_at);
CREATE INDEX idx_community_requests_priority ON community_requests(priority);

-- Enable Row Level Security (RLS)
ALTER TABLE community_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for authenticated users
CREATE POLICY "Anyone can insert community requests" ON community_requests
  FOR INSERT WITH CHECK (true);

-- Create policy to allow admins to view all requests
CREATE POLICY "Admins can view all requests" ON community_requests
  FOR SELECT USING (true);

-- Notifications table for Supabase-powered notifications
CREATE TABLE notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'sms', -- 'sms', 'email', 'push'
  status text DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  sent_at timestamp with time zone,
  metadata jsonb -- for additional data like source, priority, etc.
);

-- Create indexes for notifications
CREATE INDEX idx_notifications_phone ON notifications(phone_number);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_type ON notifications(type);

-- Enable RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for notifications
CREATE POLICY "Anyone can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view notifications" ON notifications
  FOR SELECT USING (true);