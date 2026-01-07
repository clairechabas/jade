import type React from 'react';
import { cn } from '../utils/cn';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: 'primary' | 'secondary';
};

export function Button(props: ButtonProps) {
  const { kind = 'primary', className = '', ...rest } = props;

  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const kindStyles = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-300',
  }[kind];

  return <button className={cn(baseStyles, kindStyles, className)} {...rest} />;
}
