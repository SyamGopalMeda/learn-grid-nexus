// Firebase Types for Educational Platform

export interface User {
  id: string;
  email: string;
  mobile_number?: string;
  apiKey?: string;
  default_client?: string;
  default_language: string;
  last_used_client?: string;
  current_session_client?: string;
  role: 'student' | 'tutor' | 'admin';
}

export interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  client_config: {
    client_type: 'college' | 'individual' | 'company';
    plan: 'trial' | 'premium' | 'enterprise';
    contract_end_date: Date;
    max_licences: number;
    primary_email: string;
    alternative_emails: string[];
  };
}

export interface Batch {
  id: string;
  batch_name: string;
  start_date: Date;
  end_date: Date;
  status: 'active' | 'inactive';
  client_id: string;
}

export interface Question {
  id: string;
  type: 'programming' | 'theory' | 'mcq_single' | 'mcq_multiple';
  question_text: string;
  question_description: string;
  tags: string[];
  additional_config: ProgrammingConfig | TheoryConfig | MCQSingleConfig | MCQMultipleConfig;
}

export interface ProgrammingConfig {
  difficulty: 'easy' | 'medium' | 'hard';
  time_limit: number;
  language: string;
}

export interface TheoryConfig {
  difficulty: 'easy' | 'medium' | 'hard';
  word_limit: number;
}

export interface MCQSingleConfig {
  options: string[];
  correct_answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MCQMultipleConfig {
  options: string[];
  correct_answers: number[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Assessment {
  id: string;
  client_id: string;
  batch_id: string;
  config: {
    can_skip_questions: boolean;
    shuffle_options: boolean;
    shuffle_questions: boolean;
  };
  start_date: Date;
  target_date: Date;
  status: 'active' | 'inactive' | 'draft';
  questions: string[];
}

export interface Assignment {
  id: string;
  client_id: string;
  batch_id: string;
  tags: string[];
  start_date: Date;
  target_date: Date;
  status: 'active' | 'inactive' | 'draft';
  questions: string[];
}

export interface MandatoryPractice {
  id: string;
  client_id: string;
  batch_id: string;
  start_date: Date;
  target_date: Date;
  status: 'active' | 'inactive' | 'draft';
}

export interface Submission {
  id: string;
  client_id: string;
  assessment_id: string;
  user_email: string;
  submission_date: Date;
  version: string;
  results: Record<string, {
    completeness_percentage: number;
    quality_percentage: number;
    wiseman_comments: string;
  }>;
}

export interface TutorNotification {
  id: string;
  client_id: string;
  batch_id: string;
  message: string;
  visibility: 'visible' | 'hidden';
  created_at?: Date;
}

export interface Settings {
  id: string;
  default_language: string;
  status: 'active' | 'inactive';
}

export interface Config {
  id: string;
  type: 'public_config' | 'private_config';
  data: Record<string, any>;
}

export interface Skillyhead {
  id: string;
  batch_id: string;
  status: 'active' | 'inactive';
  name: string;
}

// UI State Types
export interface DashboardStats {
  totalStudents: number;
  totalAssessments: number;
  totalSubmissions: number;
  avgScore: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  roles: User['role'][];
}