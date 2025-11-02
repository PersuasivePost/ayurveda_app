import { PageLayout } from "@/components/layout/page-layout"

export default function ForgotPassword() {
  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
            <p className="text-muted-foreground">Enter your email to reset your password</p>
          </div>
          
          <div className="bg-card border border-border/40 rounded-lg p-8">
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                  placeholder="your@email.com"
                />
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
