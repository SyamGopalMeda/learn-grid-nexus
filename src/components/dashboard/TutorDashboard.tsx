import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  ClipboardList,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const TutorDashboard: React.FC = () => {
  // Placeholder data - you'll replace with Firebase data
  const stats = {
    totalStudents: 45,
    activeAssessments: 3,
    pendingSubmissions: 12,
    completedAssignments: 78,
    avgScore: 82.5,
    activeBatches: 2
  };

  const recentAssessments = [
    { 
      id: '1', 
      title: 'Midterm Programming Assessment', 
      status: 'active', 
      submitted: 32, 
      total: 45,
      dueDate: '2025-08-31'
    },
    { 
      id: '2', 
      title: 'JavaScript Fundamentals Quiz', 
      status: 'grading', 
      submitted: 40, 
      total: 45,
      dueDate: '2025-08-25'
    },
    { 
      id: '3', 
      title: 'Database Design Assignment', 
      status: 'completed', 
      submitted: 45, 
      total: 45,
      dueDate: '2025-08-20'
    },
  ];

  const upcomingDeadlines = [
    { type: 'assessment', title: 'Final Exam Setup', date: '2025-09-01', priority: 'high' },
    { type: 'assignment', title: 'React Project Review', date: '2025-09-03', priority: 'medium' },
    { type: 'practice', title: 'Algorithm Practice Deadline', date: '2025-09-05', priority: 'low' },
  ];

  const topPerformers = [
    { name: 'Alice Johnson', score: 95, submissions: 12 },
    { name: 'Bob Smith', score: 92, submissions: 11 },
    { name: 'Carol Davis', score: 88, submissions: 12 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your batches, assessments, and student progress
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="tutor" size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            New Assessment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-student" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              In {stats.activeBatches} batches
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
            <FileText className="h-4 w-4 text-tutor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Running now
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              Need grading
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAssignments}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <ClipboardList className="h-4 w-4 text-admin" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Active assignments
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Assessments */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>
              Track student progress and submission status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{assessment.title}</h4>
                      <Badge 
                        variant={
                          assessment.status === 'active' ? 'default' :
                          assessment.status === 'grading' ? 'secondary' : 'outline'
                        }
                        className={
                          assessment.status === 'active' ? 'bg-primary' :
                          assessment.status === 'grading' ? 'bg-warning' : 'bg-success'
                        }
                      >
                        {assessment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Due: {assessment.dueDate}</span>
                      <span>{assessment.submitted}/{assessment.total} submitted</span>
                    </div>
                    <Progress 
                      value={(assessment.submitted / assessment.total) * 100} 
                      className="mt-2 h-2"
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Students with highest scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {student.submissions} submissions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{student.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>
            Important dates and tasks requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <AlertCircle className={`w-4 h-4 ${
                  deadline.priority === 'high' ? 'text-destructive' :
                  deadline.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">{deadline.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorDashboard;