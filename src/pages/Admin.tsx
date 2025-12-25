import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Mail, User, Building, MessageSquare, Clock, RefreshCw, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface Contact {
    _id: string;
    name: string;
    email: string;
    company?: string;
    message: string;
    createdAt: string;
}

const Admin = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${apiUrl}/api/contacts`);
            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }
            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/')}
                                className="hover:bg-primary/10"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-display font-bold text-gradient">Admin Dashboard</h1>
                                <p className="text-sm text-muted-foreground">Contact Form Submissions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="text-sm">
                                {contacts.length} {contacts.length === 1 ? 'Submission' : 'Submissions'}
                            </Badge>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={fetchContacts}
                                disabled={loading}
                                className="gap-2"
                            >
                                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {error && (
                    <Card className="mb-6 border-destructive/50 bg-destructive/10">
                        <CardContent className="py-4">
                            <p className="text-destructive text-center">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {loading ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="card-glow">
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-16 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : contacts.length === 0 ? (
                    <Card className="card-glow">
                        <CardContent className="py-16 text-center">
                            <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No Submissions Yet</h2>
                            <p className="text-muted-foreground">
                                Contact form submissions will appear here.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {contacts.map((contact) => (
                            <Card key={contact._id} className="card-glow hover:border-primary/50 transition-all duration-300">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <User className="h-4 w-4 text-primary" />
                                                {contact.name}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <Mail className="h-3 w-3" />
                                                {contact.email}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {contact.company && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Building className="h-4 w-4" />
                                            <span>{contact.company}</span>
                                        </div>
                                    )}

                                    <div className="bg-muted/50 rounded-lg p-3">
                                        <p className="text-sm leading-relaxed">{contact.message}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
                                        <Clock className="h-3 w-3" />
                                        <span>
                                            {format(new Date(contact.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;
