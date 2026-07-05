export type UserRole = "requester" | "agent";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type TicketCategory = "hardware" | "software" | "access" | "other";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
};

export type Ticket = {
  id: string;
  requester_id: string;
  assignee_id: string | null;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: string;
  ticket_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string;
          role?: UserRole;
        };
      };
      tickets: {
        Row: Ticket;
        Insert: {
          id?: string;
          requester_id: string;
          assignee_id?: string | null;
          title: string;
          description: string;
          category?: TicketCategory;
          priority?: TicketPriority;
          status?: TicketStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          assignee_id?: string | null;
          title?: string;
          description?: string;
          category?: TicketCategory;
          priority?: TicketPriority;
          status?: TicketStatus;
        };
      };
      comments: {
        Row: Comment;
        Insert: {
          id?: string;
          ticket_id: string;
          author_id: string;
          body: string;
          created_at?: string;
        };
        Update: {
          body?: string;
        };
      };
    };
    Enums: {
      user_role: UserRole;
      ticket_status: TicketStatus;
      ticket_priority: TicketPriority;
      ticket_category: TicketCategory;
    };
  };
};
