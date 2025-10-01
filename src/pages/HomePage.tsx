import { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DollarSign, BarChart, CheckCircle, Clock, Tractor, Leaf, Banknote, Factory, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import type { DashboardSummary, Application, ApplicationStatus, Scheme } from '@shared/types';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
const StatCard = ({ title, value, icon: Icon, loading }: { title: string; value: string; icon: React.ElementType; loading: boolean }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {loading ? <Skeleton className="h-8 w-3/4" /> : <div className="text-2xl font-bold">{value}</div>}
    </CardContent>
  </Card>
);
const statusStyles: { [key in ApplicationStatus]: string } = {
  'Approved': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'In Review': 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};
const ApplicationStatusBadge = ({ status }: { status: ApplicationStatus }) => (
  <Badge variant="outline" className={cn("border-transparent", statusStyles[status])}>
    {status}
  </Badge>
);
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};
const HeroSection = () => {
  const user = useAuthStore((state) => state.user);
  const userName = user?.email.split('@')[0] || 'Farmer';
  return (
    <div className="relative rounded-xl overflow-hidden mb-12 bg-green-800">
      <img
        src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format=fit=crop"
        alt="Lush green field"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative p-8 md:p-12 text-white">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight capitalize">Welcome Back, {userName}!</h1>
        <p className="text-lg text-green-200 mt-2">Here's a summary of your agricultural financial aid.</p>
      </div>
    </div>
  );
};
const iconMap: { [key: string]: LucideIcon } = { Tractor, Leaf, Banknote, Factory };
const FeaturedSchemeCard = ({ scheme }: { scheme: Scheme }) => {
  const Icon = iconMap[scheme.icon] || Leaf;
  return (
    <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-lg leading-tight">{scheme.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{scheme.description.substring(0, 100)}...</CardDescription>
      </CardContent>
    </Card>
  );
};
export function HomePage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryData, applicationsData, schemesData] = await Promise.all([
          api<DashboardSummary>('/api/dashboard-summary'),
          api<Application[]>('/api/applications'),
          api<Scheme[]>('/api/schemes'),
        ]);
        setSummary(summaryData);
        setApplications(applicationsData);
        setSchemes(schemesData);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const chartData = useMemo(() => {
    const loanCount = applications.filter(app => app.type === 'Loan').length;
    const subsidyCount = applications.filter(app => app.type === 'Subsidy').length;
    if (loanCount === 0 && subsidyCount === 0) return [];
    return [
      { name: 'Loans', value: loanCount, color: '#f59e0b' },
      { name: 'Subsidies', value: subsidyCount, color: '#22c55e' },
    ];
  }, [applications]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <HeroSection />
      {error && <p className="text-red-500 text-center py-8">{error}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <StatCard title="Total Loan Amount" value={summary ? formatCurrency(summary.totalLoanAmount) : '₹0'} icon={DollarSign} loading={loading} />
        <StatCard title="Subsidies Received" value={summary ? formatCurrency(summary.totalSubsidiesReceived) : '₹0'} icon={BarChart} loading={loading} />
        <StatCard title="Applications In Review" value={summary ? String(summary.applicationsInReview) : '0'} icon={Clock} loading={loading} />
        <StatCard title="Approved Applications" value={summary ? String(summary.approvedApplications) : '0'} icon={CheckCircle} loading={loading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Recent Applications</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-16" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                      <TableCell className="text-center"><Skeleton className="h-6 w-24 mx-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : applications.length > 0 ? (
                  applications.slice(0, 5).map((app) => (
                    <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`application/${app.id}`)}>
                      <TableCell className="font-medium">{app.schemeName}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{app.type}</TableCell>
                      <TableCell className="text-right">{formatCurrency(app.amount)}</TableCell>
                      <TableCell className="text-center"><ApplicationStatusBadge status={app.status} /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={4} className="text-center h-24 text-muted-foreground">No applications found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Application Breakdown</h2>
          <Card>
            <CardContent className="pt-6">
              {loading ? <Skeleton className="h-64 w-full" /> :
                chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {chartData.map((entry) => (<Cell key={`cell-${entry.name}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} Application(s)`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <div className="h-64 flex items-center justify-center text-muted-foreground">No data to display</div>
              }
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Schemes</h2>
          <Button variant="link" asChild><Link to="schemes">View All &rarr;</Link></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 w-full" />) :
            schemes.slice(0, 4).map(scheme => <FeaturedSchemeCard key={scheme.id} scheme={scheme} />)
          }
        </div>
      </div>
    </div>
  );
}