import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter,
  Code,
  FileText,
  CheckCircle,
  ListChecks,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Question {
  id: string;
  type: 'programming' | 'theory' | 'mcq_single' | 'mcq_multiple';
  question_text: string;
  question_description: string;
  tags: string[];
  additional_config: any;
  created_at: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const QuestionBank: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Placeholder data - you'll replace with Firebase data
  const questions: Question[] = [
    {
      id: 'q1_programming',
      type: 'programming',
      question_text: 'Write a function to reverse a string in JavaScript',
      question_description: 'Implement a function that takes a string as input and returns its reverse. Do not use built-in reverse methods.',
      tags: ['javascript', 'strings', 'algorithms'],
      additional_config: {
        difficulty: 'medium',
        time_limit: 30,
        language: 'javascript'
      },
      created_at: '2025-08-15',
      difficulty: 'medium'
    },
    {
      id: 'q2_theory',
      type: 'theory',
      question_text: 'Explain the difference between Firestore and Realtime Database',
      question_description: 'Write a detailed comparison covering data structure, querying capabilities, and use cases.',
      tags: ['firebase', 'database', 'theory'],
      additional_config: {
        difficulty: 'medium',
        word_limit: 500
      },
      created_at: '2025-08-14',
      difficulty: 'medium'
    },
    {
      id: 'q3_mcq_single',
      type: 'mcq_single',
      question_text: 'What does HTML stand for?',
      question_description: 'Choose the correct full form of HTML',
      tags: ['html', 'web-development', 'basics'],
      additional_config: {
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink and Text Markup Language'
        ],
        correct_answer: 0,
        difficulty: 'easy'
      },
      created_at: '2025-08-13',
      difficulty: 'easy'
    },
    {
      id: 'q4_mcq_multiple',
      type: 'mcq_multiple',
      question_text: 'Which of the following are JavaScript frameworks?',
      question_description: 'Select all that apply',
      tags: ['javascript', 'frameworks'],
      additional_config: {
        options: ['React', 'Angular', 'Vue.js', 'Laravel', 'Django'],
        correct_answers: [0, 1, 2],
        difficulty: 'medium'
      },
      created_at: '2025-08-12',
      difficulty: 'medium'
    }
  ];

  const allTags = Array.from(new Set(questions.flatMap(q => q.tags)));

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || question.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesTag = selectedTag === 'all' || question.tags.includes(selectedTag);
    
    return matchesSearch && matchesType && matchesDifficulty && matchesTag;
  });

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'programming': return Code;
      case 'theory': return FileText;
      case 'mcq_single': return CheckCircle;
      case 'mcq_multiple': return ListChecks;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'programming': return 'bg-primary';
      case 'theory': return 'bg-tutor';
      case 'mcq_single': return 'bg-success';
      case 'mcq_multiple': return 'bg-admin';
      default: return 'bg-muted';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'hard': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Bank</h1>
          <p className="text-muted-foreground">
            Manage and organize your assessment questions
          </p>
        </div>
        <Button variant="tutor" size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Create Question
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions by text or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="mcq_single">MCQ Single</SelectItem>
                  <SelectItem value="mcq_multiple">MCQ Multiple</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQuestions.map((question) => {
          const Icon = getQuestionIcon(question.type);
          
          return (
            <Card key={question.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 ${getTypeColor(question.type)} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base leading-tight mb-2">
                        {question.question_text}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getTypeColor(question.type)}>
                          {question.type.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {question.question_description}
                </p>

                {/* Question-specific details */}
                {question.type === 'programming' && (
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="font-medium">{question.additional_config.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Limit:</span>
                      <span className="font-medium">{question.additional_config.time_limit} min</span>
                    </div>
                  </div>
                )}

                {question.type === 'theory' && (
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Word Limit:</span>
                      <span className="font-medium">{question.additional_config.word_limit} words</span>
                    </div>
                  </div>
                )}

                {(question.type === 'mcq_single' || question.type === 'mcq_multiple') && (
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Options:</span>
                      <span className="font-medium">{question.additional_config.options.length}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {question.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                  <span>Created: {question.created_at}</span>
                  <span>ID: {question.id}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No questions found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Create your first question to get started'}
            </p>
            <Button variant="tutor" className="gap-2">
              <Plus className="w-4 h-4" />
              Create Question
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestionBank;