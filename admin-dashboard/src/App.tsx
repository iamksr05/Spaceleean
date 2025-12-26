import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    Mail,
    User,
    Building,
    MessageSquare,
    Clock,
    RefreshCw,
    Shield,
    X,
    Lock,
    Eye,
    EyeOff,
    LogOut,
} from "lucide-react";
import { ReloadPrompt } from "./ReloadPrompt";
import { InstallPrompt } from "./InstallPrompt";

interface Contact {
    _id: string;
    name: string;
    email: string;
    company?: string;
    message: string;
    createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3333";
const ADMIN_PASSWORD = import.meta.env.ADMIN_PASS;
console.log("Loaded Env Password:", ADMIN_PASSWORD); // Debugging line

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    // Check if already authenticated (session storage)
    useEffect(() => {
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_authenticated", "true");
            setLoginError("");
        } else {
            setLoginError("Incorrect password");
            setPassword("");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword("");
        sessionStorage.removeItem("admin_authenticated");
    };

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/contacts`);
            if (!response.ok) {
                throw new Error("Failed to fetch contacts");
            }
            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchContacts();
        }
    }, [isAuthenticated]);

    const closeModal = () => {
        setSelectedContact(null);
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-[100dvh] bg-background flex items-center justify-center p-4 relative overflow-y-auto">
                {/* Error Toast at Top */}
                {loginError && (
                    <div className="fixed top-4 left-4 right-4 flex justify-center animate-fade-in z-50">
                        <div className="px-4 py-2 rounded-full bg-destructive/20 border border-destructive/30 text-destructive text-sm shadow-lg backdrop-blur-md">
                            {loginError}
                        </div>
                    </div>
                )}

                <div className="w-full max-w-sm my-auto py-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-10 w-10 text-primary" />
                        </div>
                        <h1 className="text-2xl font-display font-bold text-gradient">
                            SPACELEEAN Admin
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Enter password to continue
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className={`relative ${loginError ? 'animate-shake' : ''}`}>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Lock className={`h-5 w-5 ${loginError ? 'text-destructive' : ''}`} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (loginError) setLoginError("");
                                }}
                                placeholder="Enter password"
                                className={`w-full pl-12 pr-12 py-4 rounded-xl bg-card border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${loginError
                                    ? 'border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20'
                                    : 'border-border focus:border-primary/50 focus:ring-primary/20'
                                    }`}
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <Lock className="h-4 w-4" />
                            Login
                        </button>
                    </form>

                    <p className="text-center text-xs text-muted-foreground mt-6">
                        Protected admin area
                    </p>
                </div>
                <InstallPrompt />
            </div>
        );
    }

    // Dashboard Screen
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-lg font-display font-bold text-gradient">
                                    Admin
                                </h1>
                                <p className="text-xs text-muted-foreground">
                                    {contacts.length} submissions
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={fetchContacts}
                                disabled={loading}
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 disabled:opacity-50"
                            >
                                <RefreshCw
                                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                                />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 transition-all duration-300"
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4 text-destructive" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-4 py-4">
                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-center">
                        <p className="text-destructive text-sm">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="space-y-3">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl bg-card border border-border p-4 animate-pulse"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-muted"></div>
                                        <div>
                                            <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                                            <div className="h-3 bg-muted rounded w-16"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="rounded-xl bg-card border border-border p-12 text-center">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <h2 className="text-lg font-semibold mb-1">No Submissions</h2>
                        <p className="text-sm text-muted-foreground">
                            Contact submissions will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {contacts.map((contact) => (
                            <div
                                key={contact._id}
                                onClick={() => setSelectedContact(contact)}
                                className="rounded-xl bg-card border border-border p-4 card-glow hover:border-primary/50 transition-all duration-300 cursor-pointer active:scale-[0.98]"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <User className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm">{contact.name}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                {format(new Date(contact.createdAt), "MMM d, h:mm a")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-primary/60">
                                        <MessageSquare className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal Popup */}
            {selectedContact && (
                <div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <div
                        className="relative w-full sm:max-w-lg mx-4 mb-0 sm:mb-0 bg-card border border-border rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-hidden animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-lg">
                                        {selectedContact.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {format(
                                            new Date(selectedContact.createdAt),
                                            "MMM d, yyyy 'at' h:mm a"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
                            {/* Email */}
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                                <Mail className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        className="text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        {selectedContact.email}
                                    </a>
                                </div>
                            </div>

                            {/* Company */}
                            {selectedContact.company && (
                                <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                                    <Building className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Company
                                        </p>
                                        <p className="text-sm font-medium">
                                            {selectedContact.company}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Message */}
                            <div className="p-3 rounded-xl bg-muted/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                    <p className="text-xs text-muted-foreground">Message</p>
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {selectedContact.message}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-border/50">
                            <a
                                href={`mailto:${selectedContact.email}?subject=Re: Your inquiry to SPACELEEAN`}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <ReloadPrompt />
            <InstallPrompt />
        </div>
    );
}

export default App;
