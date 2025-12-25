import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };

        const installHandler = () => {
            setShowInstall(false);
            setDeferredPrompt(null);
            console.log('App installed successfully');
        };

        window.addEventListener("beforeinstallprompt", handler);
        window.addEventListener("appinstalled", installHandler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
            window.removeEventListener("appinstalled", installHandler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }
        // Hide our UI immediately so it doesn't conflict with browser dialog
        setShowInstall(false);

        // Show the native browser prompt
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        setDeferredPrompt(null);
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
