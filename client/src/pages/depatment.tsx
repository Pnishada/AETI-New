import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/api/api"; // your axios api file

export default function Departments() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState<any | null>(null);

  // Fetch departments from backend
  useEffect(() => {
    api.getDepartments().then((data) => setDepartments(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="py-16 lg:py-24 flex-1">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-slate-900">
            Automobile Engineering Departments
          </h1>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore our specialized automobile programs designed to train the next generation of skilled technicians and mechanics. Our courses combine theoretical knowledge with practical, hands-on workshops to ensure students are industry-ready and proficient with modern automotive technologies.
          </p>

          {/* Department Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card
                key={index}
                className="shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dept.image ? `http://127.0.0.1:8000${dept.image}` : "/default-dept.jpg"}
                    alt={dept.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold mb-2 text-slate-900">{dept.name}</h2>
                  <p className="text-slate-600 mb-2 leading-relaxed flex-1">
                    {dept.description.length > 140
                      ? dept.description.substring(0, 140) + "..."
                      : dept.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-slate-500">
                        <span className="font-medium text-slate-700">Head:</span> {dept.head}
                      </p>
                      <p className="text-sm text-slate-500">
                        <span className="font-medium text-slate-700">Contact:</span> {dept.contact_phone || dept.contact_email}
                      </p>
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setSelectedDept(dept)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Department Popup */}
      <Dialog open={!!selectedDept} onOpenChange={() => setSelectedDept(null)}>
        <DialogContent className="sm:max-w-3xl rounded-2xl p-0 overflow-hidden bg-transparent shadow-none">
          <AnimatePresence>
            {selectedDept && (
              <motion.div
                key="popup"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="relative h-64">
                  <img
                    src={selectedDept.image ? `http://127.0.0.1:8000${selectedDept.image}` : "/default-dept.jpg"}
                    alt={selectedDept.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <h2 className="absolute inset-0 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold text-center drop-shadow-lg px-4">
                    {selectedDept.name}
                  </h2>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 space-y-4">
                  <p className="text-slate-800 leading-relaxed">{selectedDept.description}</p>
                  <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 items-start sm:items-center">
                    <div>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium text-slate-700">Head:</span> {selectedDept.head}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium text-slate-700">Contact:</span> {selectedDept.contact_phone || selectedDept.contact_email}
                      </p>
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                      onClick={() => setSelectedDept(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
