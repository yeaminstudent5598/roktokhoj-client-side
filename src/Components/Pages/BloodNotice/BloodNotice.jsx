import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BloodNotice = () => {
  const [activeTab, setActiveTab] = useState('redBloodCells');

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <dl className="space-y-8">
        <dt className="text-3xl font-bold text-gray-900 text-center">
          Creating a happy blood donation, <br />
          <strong className="text-blue-600">safe blood transfusion, and a better future together</strong>
        </dt>
        <dd>
          {/* Tabs */}
          <div className="flex justify-center space-x-4 border-b border-gray-200">
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === 'redBloodCells'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('redBloodCells')}
            >
              Red Blood Cells
            </button>
            <button
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === 'platelets'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('platelets')}
            >
              Platelets
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'redBloodCells' && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{
                      background: 'conic-gradient(#f42e3d 0%, #f42e3d 47%, #f6f6f6 47%, #f6f6f6 100%)',
                    }}
                  >
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">4.8</span>
                      <span className="text-sm text-gray-500 ml-1">DAY</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">Blood reserves </p>
                  
                  <p className="text-gray-900 mt-2">
                    Total <strong className="text-blue-600">4.8</strong> days
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { type: 'A', progress: 37, value: 3.7 },
                    { type: 'B', progress: 70, value: 7.0 },
                    { type: 'O', progress: 43, value: 4.3 },
                    { type: 'AB', progress: 42, value: 4.2 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-gray-900 font-semibold">{item.type}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  ))}
                </div>

                <Link to="blood-reserves"
                  
                  className="flex items-center justify-center text-blue-600 hover:text-blue-800"
                >
                  <span>See more red blood cell reserves</span>
                  <i className="fas fa-plus ml-2"></i>
                </Link>
              </div>
            )}

            {activeTab === 'platelets' && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{
                      background: 'conic-gradient(#f42e3d 0%, #f42e3d 47%, #f6f6f6 47%, #f6f6f6 100%)',
                    }}
                  >
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">220</span>
                      <span className="text-sm text-gray-500 ml-1">PER</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4">Blood reserves </p>
                 
                  <p className="text-gray-900 mt-2">
                    Total <strong className="text-blue-600">220</strong> %
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { type: 'A', progress: 100, value: 200 },
                    { type: 'B', progress: 100, value: 220 },
                    { type: 'O', progress: 100, value: 229 },
                    { type: 'AB', progress: 100, value: 229 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-gray-900 font-semibold">{item.type}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  ))}
                </div>

                <Link
                   to="blood-reserves"
                  className="flex items-center justify-center text-blue-600 hover:text-blue-800"
                >
                  <span>See more platelet counts</span>
                  <i className="fas fa-plus ml-2"></i>
                </Link>
              </div>
            )}
          </div>
        </dd>
      </dl>
    </div>
  );
};

export default BloodNotice;