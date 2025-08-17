import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  FileText, 
  ClipboardList,
  Target,
  Trophy,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  // Placeholder data - you'll replace with Firebase data
  const stats = {
    completedAssessments: 8,
    pendingAssignments: 3,
    practiceStreak: 12,
    averageScore: 85.5,
    totalSubmissions: 25,
    rank: 5
  };

  const upcomingTasks = [
    { 
      id: '1', 
      type: 'assessment', 
      title: 'Midterm Programming Assessment', 
      dueDate: '2025-08-31',
      timeLeft: '3 days',
      priority: 'high'
    },
    { 
      id: '2', 
      type: 'assignment', 
      title: 'React Component Design', 
      dueDate: '2025-09-05',
      timeLeft: '8 days',
      priority: 'medium'
    },
    { 
      id: '3', 
      type: 'practice', 
      title: 'Daily Algorithm Challenge', 
      dueDate: 'Today',
      timeLeft: '6 hours',
      priority: 'low'
    },
  ];

  const recentScores = [
    { assessment: 'JavaScript Basics Quiz', score: 92, date: '2025-08-20', grade: 'A' },
    { assessment: 'Database Query Assignment', score: 88, date: '2025-08-18', grade: 'B+' },
    { assessment: 'HTML/CSS Project', score: 95, date: '2025-08-15', grade: 'A+' },
  ];

  const progressData = [
    { subject: 'Programming', progress: 85, level: 'Advanced' },
    { subject: 'Database Design', progress: 70, level: 'Intermediate' },
    { subject: 'Web Development', progress: 90, level: 'Advanced' },
    { subject: 'Algorithms', progress: 60, level: 'Intermediate' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and upcoming assignments
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium">Rank #{stats.rank}</span>
          </div>
          <p className="text-xs text-muted-foreground">In your batch</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Assessments done
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">
              Tasks remaining
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Streak</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.practiceStreak}</div>
            <p className="text-xs text-muted-foreground">
              Days in a row
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-student" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <FileText className="h-4 w-4 text-tutor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              Total attempts
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <ClipboardList className="h-4 w-4 text-admin" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Total assigned
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Assignments and assessments due soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      task.type === 'assessment' ? 'bg-primary/10' :
                      task.type === 'assignment' ? 'bg-tutor/10' : 'bg-success/10'
                    }`}>
                      {task.type === 'assessment' ? <FileText className="w-5 h-5 text-primary" /> :
                       task.type === 'assignment' ? <ClipboardList className="w-5 h-5 text-tutor" /> :
                       <Target className="w-5 h-5 text-success" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">Due: {task.dueDate}</span>
                        <Badge 
                          variant="outline"
                          className={
                            task.priority === 'high' ? 'border-destructive text-destructive' :
                            task.priority === 'medium' ? 'border-warning text-warning' :
                            'border-muted-foreground text-muted-foreground'
                          }
                        >
                          {task.timeLeft}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="student" size="sm">
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Scores */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Scores</CardTitle>
            <CardDescription>
              Your latest assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScores.map((score, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{score.assessment}</p>
                    <p className="text-xs text-muted-foreground">{score.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{score.score}%</span>
                      <Badge 
                        variant="outline"
                        className={
                          score.score >= 90 ? 'border-success text-success' :
                          score.score >= 80 ? 'border-primary text-primary' :
                          'border-warning text-warning'
                        }
                      >
                        {score.grade}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>
            Track your advancement across different subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {progressData.map((subject) => (
              <div key={subject.subject} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{subject.subject}</h4>
                  <Badge variant="outline">{subject.level}</Badge>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{subject.progress}% completed</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;