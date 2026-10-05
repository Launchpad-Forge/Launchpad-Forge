"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { SubmitButton } from "@/components/crm/SubmitButton";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    return await login(formData);
  }, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-glow rounded-full blur-[120px]" />
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 noise" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 glass-elevated rounded-2xl shadow-2xl relative z-10 mx-4"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-white mb-6 shadow-lg shadow-accent/20">
            <span className="font-bold text-xl">LF</span>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome Back</h1>
          <p className="text-text-secondary text-sm">Sign in to your Forge CRM account</p>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm flex items-center justify-center"
            >
              {state.error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary ml-1" htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                id="email"
                name="email"
                type="email" 
                required 
                placeholder="admin@launchpadforge.com"
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text-primary placeholder:text-text-muted/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-medium text-text-secondary" htmlFor="password">Password</label>
              <a href="#" className="text-xs text-accent hover:text-accent/80 transition-colors">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                id="password"
                name="password"
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text-primary placeholder:text-text-muted/50"
              />
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton label="Sign In" className="w-full py-2.5 rounded-lg text-base" />
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-accent hover:text-accent/80 transition-colors font-medium">Contact admin</a>
        </div>
      </motion.div>
    </div>
  );
}
