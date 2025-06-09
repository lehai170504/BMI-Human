"use client"
import HomeContent from "@/components/layout/Home/Content";
import FAQ from "@/components/layout/Home/FAQ";
import ConnectExpert from "@/components/layout/Home/ConnectExpert";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Empty column for left spacing */}
          <div className="hidden lg:block lg:col-span-1" />
          
          {/* Main Content - Center */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <HomeContent />
            </div>
          </div>

          {/* FAQ - Right Side */}
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-8">
              <FAQ />
            </div>
          </div>
        </div>
      </div>
      <ConnectExpert />
    </div>
  );
}