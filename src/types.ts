

export type Issue = {
    id: string;
    title: string;
    status: string;
    priority: 'high' | 'medium' | 'low';
    severity: number;
    createdAt: string;
    assignee: string;
    tags: string[];
};


export type PartialIssue = Partial<Issue>;

export type User = {
  id: number;
  name: string;
  role: 'admin' | 'contributor'
}


export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: React.ReactNode;
  type: ToastType;
  onClick?: (id: string, close: () =>void) => void;
  timeout?: number;
  className?: string;
}