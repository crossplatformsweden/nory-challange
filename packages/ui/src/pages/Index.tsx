import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import MetricsOverview from '../components/Dashboard/MetricsOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Simple function to show different content based on the active tab
  const renderDashboardContent = () => {
    switch(activeTab) {
      case 'overview':
        return <MetricsOverview />;
      case 'orders':
        return (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Order management section coming soon</p>
          </div>
        );
      case 'inventory':
        return (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Inventory management section coming soon</p>
          </div>
        );
      case 'staff':
        return (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Staff management section coming soon</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Analytics section coming soon</p>
          </div>
        );
      default:
        return <MetricsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Dashboard Demo Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nory-900 mb-4">Restaurant Management Dashboard</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a complete view of your restaurant's performance with our intuitive dashboard. Monitor sales, inventory, staff, and more in real-time.
            </p>
          </div>
          
          <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="border-b border-gray-200">
              <Tabs defaultValue="overview" className="w-full">
                <div className="px-6 pt-6">
                  <TabsList className="grid grid-cols-5">
                    <TabsTrigger 
                      value="overview" 
                      onClick={() => setActiveTab('overview')}
                      className="data-[state=active]:bg-nory-50 data-[state=active]:text-nory-800"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="orders" 
                      onClick={() => setActiveTab('orders')}
                      className="data-[state=active]:bg-nory-50 data-[state=active]:text-nory-800"
                    >
                      Orders
                    </TabsTrigger>
                    <TabsTrigger 
                      value="inventory" 
                      onClick={() => setActiveTab('inventory')}
                      className="data-[state=active]:bg-nory-50 data-[state=active]:text-nory-800"
                    >
                      Inventory
                    </TabsTrigger>
                    <TabsTrigger 
                      value="staff" 
                      onClick={() => setActiveTab('staff')}
                      className="data-[state=active]:bg-nory-50 data-[state=active]:text-nory-800"
                    >
                      Staff
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics" 
                      onClick={() => setActiveTab('analytics')}
                      className="data-[state=active]:bg-nory-50 data-[state=active]:text-nory-800"
                    >
                      Analytics
                    </TabsTrigger>
                  </TabsList>
                </div>
              
                <div className="p-6">
                  {renderDashboardContent()}
                </div>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="nory-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your restaurant operations?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of restaurants saving time and increasing profits with nory.
          </p>
          <button className="bg-white text-nory-900 hover:bg-nory-50 py-3 px-8 rounded-lg font-medium text-lg transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-nory-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold mb-4">nory</div>
              <p className="text-gray-300 max-w-xs">
                The complete restaurant management solution for modern businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Demo</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Guides</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2025 nory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
