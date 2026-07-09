import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 text-center select-none">
          <Card className="max-w-md w-full flex flex-col items-center gap-6 p-10 border-red-500/10 dark:border-red-500/15">
            <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center animate-pulse">
              <AlertCircle className="w-6 h-6 stroke-[1.8]" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-2xl text-text-primary">Something went astray</h1>
              <p className="font-sans text-xs text-text-muted font-light leading-relaxed">
                An unexpected hiccup occurred in our system. Don't worry, your documents and progress remain fully secure.
              </p>
            </div>

            {this.state.error && (
              <pre className="w-full text-[10px] text-left text-red-500 bg-red-50/50 dark:bg-red-950/20 p-3 rounded-xl border border-red-500/5 font-mono overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}

            <Button onClick={this.handleReset} variant="outline" className="mt-2 w-full sm:w-auto">
              <RotateCcw className="w-3.5 h-3.5" />
              Reload Application
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
