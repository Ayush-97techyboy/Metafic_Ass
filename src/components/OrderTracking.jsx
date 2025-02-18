import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';

export function OrderTracking({ orders }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">Order Tracking</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="relative">
              <div className="flex justify-between mb-2">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.status !== 'processing' ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <Package className="text-white" size={20} />
                  </div>
                  <span className="text-xs mt-1">Processing</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <Truck className="text-white" size={20} />
                  </div>
                  <span className="text-xs mt-1">Shipped</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <CheckCircle className="text-white" size={20} />
                  </div>
                  <span className="text-xs mt-1">Delivered</span>
                </div>
              </div>
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                <div className={`h-full bg-green-500 transition-all ${
                  order.status === 'processing' ? 'w-0' :
                  order.status === 'shipped' ? 'w-1/2' :
                  'w-full'
                }`} />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">{item.title}</h5>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}