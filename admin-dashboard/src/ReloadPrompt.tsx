import { useRegisterSW } from 'virtual:pwa-register/react'
import { X, RefreshCw } from 'lucide-react'

export function ReloadPrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r)
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    // Testing purposes
    // const needRefresh = true;

    if (!needRefresh) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[100] p-4 rounded-xl bg-card border border-primary/20 shadow-lg animate-fade-in max-w-sm w-full">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">Update Available</h3>
                    <p className="text-xs text-muted-foreground">
                        A new version of the app is available. Click refresh to update.
                    </p>
                </div>
                <button
                    onClick={() => setNeedRefresh(false)}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => updateServiceWorker(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <RefreshCw className="h-3 w-3" />
                    Refresh
                </button>
            </div>
        </div>
    )
}
