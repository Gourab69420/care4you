import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import LightPillar from "../../components/specific/LightPillar";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Activity, Flower2, Leaf, CheckCircle2, FileUp } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import api from "../../lib/api";

type DoctorType = "general" | "homeopathy" | "ayurvedic";

const COUNTRIES = ["India", "USA", "UK", "Canada", "Australia"];
const INDIAN_STATES = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "West Bengal", "Rajasthan", "Uttar Pradesh"];
const CITIES = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
};

const Login = () => {
  const navigate = useNavigate();
  const [showRegistration, setShowRegistration] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);

  // Registration form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState<DoctorType>("general");
  const [mobile, setMobile] = useState("");
  const [regNo, setRegNo] = useState("");
  const [council, setCouncil] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [govtIdFile, setGovtIdFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      // Check if user already exists
      const checkResponse = await api.post("/api/auth/doctor/google-check", {
        email: decoded.email
      });

      if (checkResponse.data.exists) {
        // User exists, login directly
        const { token, category } = checkResponse.data;
        localStorage.setItem("doctorToken", token);
        
        if (category === "homeopathy") navigate("/doctor/homeopathy");
        else if (category === "ayurvedic") navigate("/doctor/ayurvedic");
        else navigate("/doctor/general");
      } else {
        // New user, show registration form
        setGoogleUser(decoded);
        setName(decoded.name || "");
        setShowRegistration(true);
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    }
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/doctor/google-register", {
        email: googleUser.email,
        name,
        mobile,
        category,
        speciality,
        regNo,
        council,
        clinicName,
        country,
        state,
        city,
        licenseUrl: "mock-license-url",
        govtIdUrl: "mock-govt-id-url"
      });

      const { token, status, category: userCategory } = response.data;
      localStorage.setItem("doctorToken", token);

      // Navigate based on category
      if (userCategory === "homeopathy") navigate("/doctor/homeopathy");
      else if (userCategory === "ayurvedic") navigate("/doctor/ayurvedic");
      else navigate("/doctor/general");
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const doctorTypes = [
    { id: "general", label: "General Physician", icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
    { id: "homeopathy", label: "Homeopathist", icon: Flower2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { id: "ayurvedic", label: "Ayurvedic Doctor", icon: Leaf, color: "text-amber-400", bg: "bg-amber-400/10" },
  ] as const;

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "demo-client-id"}>
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#020617] relative overflow-hidden p-4 pt-40 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          <LightPillar intensity={0.2} pillarWidth={12} rotationSpeed={0} topColor="#4f46e5" bottomColor="#9333ea" className="pointer-events-none" />
        </div>

        <div className="relative z-50 w-full max-w-2xl">
          <div className="flex flex-col items-center mb-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mb-4">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
                <Stethoscope className="w-7 h-7 text-indigo-400" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mb-1">
                Care4You <span className="text-indigo-400/80 font-medium">Healthcare</span>
              </h1>
            </motion.div>
          </div>

          <Card className="backdrop-blur-2xl bg-slate-950/60 border-white/10 p-0.5 overflow-hidden shadow-2xl">
            <div className="bg-slate-900/90 rounded-[calc(1.5rem-4px)] p-6 md:p-10">
              {!showRegistration ? (
                <motion.div key="google-login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm mx-auto text-center space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Doctor Portal Access</h2>
                    <p className="text-slate-400 text-sm">Sign in with your professional Google account</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setError("Google login failed")}
                      theme="filled_black"
                      size="large"
                      text="signin_with"
                      shape="rectangular"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                      {error}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="registration" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-xl font-bold text-white mb-6 text-center">Complete Your Profile</h2>
                  
                  <div className="space-y-6">
                    {/* Doctor Category */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Specialization</label>
                      <div className="grid grid-cols-3 gap-3">
                        {doctorTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setCategory(type.id)}
                            className={clsx(
                              "p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                              category === type.id ? "bg-slate-950 border-indigo-500" : "bg-slate-950/40 border-transparent text-slate-600 hover:border-white/5"
                            )}
                          >
                            <type.icon className={clsx("w-5 h-5", category === type.id ? type.color : "text-slate-600")} />
                            <span className="text-[9px] font-bold text-center">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-slate-950 h-10" />
                      <Input label="Email" value={googleUser?.email} disabled className="bg-slate-950/50 h-10 text-slate-500" />
                      <Input label="Mobile" placeholder="+91" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="bg-slate-950 h-10" />
                      <Input label="Speciality" placeholder="e.g., Cardiology" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required className="bg-slate-950 h-10" />
                    </div>

                    {/* Registration Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Medical Reg. No" placeholder="MCI-XXXXXX" value={regNo} onChange={(e) => setRegNo(e.target.value)} required className="bg-slate-950 h-10" />
                      <Input label="Medical Council" placeholder="State/National" value={council} onChange={(e) => setCouncil(e.target.value)} required className="bg-slate-950 h-10" />
                      <Input label="Clinic/Hospital" placeholder="Facility Name" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required className="bg-slate-950 h-10" />
                    </div>

                    {/* Location Dropdowns */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">Country</label>
                        <select value={country} onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500">
                          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">State</label>
                        <select value={state} onChange={(e) => { setState(e.target.value); setCity(""); }} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500">
                          <option value="">Select State</option>
                          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-400 mb-2 block">City</label>
                        <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50">
                          <option value="">Select City</option>
                          {state && CITIES[state as keyof typeof CITIES]?.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center">
                        {error}
                      </div>
                    )}

                    <Button onClick={handleRegistration} isLoading={isLoading} className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
                      Complete Registration
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          <p className="mt-8 text-center text-[9px] text-slate-700 font-bold uppercase tracking-[0.3em]">
            Enterprise Medical OS • HIPAA Standard
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
