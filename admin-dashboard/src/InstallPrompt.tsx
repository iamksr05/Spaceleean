import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowInstall(true);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setShowInstall(false);
    };

    if (!showInstall) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up flex justify-center">
            <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-4 max-w-sm w-full mx-auto relative backdrop-blur-md bg-opacity-90">
                <div className="w-10 h-10 rounded-lg bg-background/20 flex items-center justify-center shrink-0">
                    <Download className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">Install App</h3>
                    <p className="text-xs opacity-90">Get the best experience</p>
                </div>
                <button
                    onClick={handleInstallClick}
                    className="bg-background text-foreground px-4 py-2 rounded-lg text-xs font-bold hover:bg-background/90 transition-colors"
                >
                    Install
                </button>
                <button
                    onClick={() => setShowInstall(false)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                    <X className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
