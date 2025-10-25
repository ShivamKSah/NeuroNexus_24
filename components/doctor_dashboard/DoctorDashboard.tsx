import React, { useState } from 'react';
import type { Patient, Doctor } from '../../types';
import { DoctorSidebar } from './DoctorSidebar';
import { Header } from '../Header';
import { ArrowLeftIcon } from '../icons';
import { DashboardView } from '../DashboardView';
import { PatientDetailView } from '../PatientDetailView';
import { DepartmentView } from './DepartmentView';
import { PatientListView } from './PatientListView';
import { LiveVentilatorView } from './LiveVentilatorView';
import { PrescriptionView } from './PrescriptionView';

// Import all view components
import { PatientReportsView } from './views/PatientReportsView';
import { CaseHistoryView } from './views/CaseHistoryView';
import { TestResultsView } from './views/TestResultsView';
import { DiagnosticToolsView } from './views/DiagnosticToolsView';
import { CurrentStatusView } from './views/CurrentStatusView';
import { TreatmentModuleView } from './views/TreatmentModuleView';
import { AppointmentsView } from './views/AppointmentsView';
import { MessagingView } from './views/MessagingView';
import { NotificationsView } from './views/NotificationsView';
import { InventoryView } from './views/InventoryView';
import { BillingView } from './views/BillingView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsProfileView } from './views/SettingsProfileView';
import { HelpView } from './views/HelpView';

interface DoctorDashboardProps {
    onLogout: () => void;
    userRole: string;
    doctor: {
        id: string;
        name: string;
    };
    patients: Patient[];
    doctors: Doctor[];
    onAddPrescription: (patientId: string, prescriptionData: any) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = (props) => {
    const { onLogout, userRole, doctor, patients, doctors, onAddPrescription } = props;
    const [activeView, setActiveView] = useState<'dashboard' | 'patient_list' | 'patient_detail' | 'ventilator_monitor' | 'prescriptions' | 'patient_reports' | 'case_history' | 'tests_results' | 'diagnostic_tools' | 'current_status' | 'treatment_module' | 'appointments_schedule' | 'messaging' | 'notifications' | 'inventory_equipment' | 'billing_insurance' | 'analytics_reports' | 'settings_profile' | 'help_documentation' | 'cardiology' | 'neurology' | 'orthopedics' | 'emergency' | 'general_medicine' | 'pediatrics' | 'gynecology' | 'dermatology' | 'surgery_medicine'>('dashboard');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const myPatients = patients.filter(p => p.assignedDoctorId === doctor.id);

    const handlePatientSelect = (patient: Patient) => {
        setSelectedPatient(patient);
        setActiveView('patient_detail');
    };

    const handleBack = () => {
        if (activeView === 'patient_detail') {
            setActiveView('patient_list');
        }
    };

    const getHeaderTitle = () => {
        const viewTitles: Record<string, string> = {
            'dashboard': 'Dashboard Overview',
            'patient_list': 'Patient List',
            'patient_detail': selectedPatient ? `Patient: ${selectedPatient.name}` : 'Patient Details',
            'ventilator_monitor': 'Live Vitals Monitoring',
            'prescriptions': 'Prescription Management',
            'patient_reports': 'Patient Reports',
            'case_history': 'Case History',
            'tests_results': 'Test & Results',
            'diagnostic_tools': 'Diagnostic Tools',
            'current_status': 'Current Status',
            'treatment_module': 'Treatment Module',
            'appointments_schedule': 'Appointments Schedule',
            'messaging': 'Messaging',
            'notifications': 'Notifications',
            'inventory_equipment': 'Inventory & Equipment',
            'billing_insurance': 'Billing Overview',
            'analytics_reports': 'Analytics & Reports',
            'settings_profile': 'Settings & Profile',
            'help_documentation': 'Help & Documentation',
            'cardiology': 'Cardiology Department',
            'neurology': 'Neurology Department',
            'orthopedics': 'Orthopedics Department',
            'emergency': 'Emergency Department',
            'general_medicine': 'General Medicine Department',
            'pediatrics': 'Pediatrics Department',
            'gynecology': 'Gynecology Department',
            'dermatology': 'Dermatology Department',
            'surgery_medicine': 'Surgery & Medicine Department'
        };
        
        return viewTitles[activeView] || 'Doctor Portal';
    };

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardView onPatientSelect={handlePatientSelect} />;
            case 'patient_list': return <PatientListView patients={myPatients} onSelectPatient={handlePatientSelect} />;
            case 'ventilator_monitor': return <LiveVentilatorView patients={myPatients} />;
            case 'prescriptions': return <PrescriptionView doctorName={doctor.name} onAddPrescription={onAddPrescription} patients={myPatients} />;
            
            // Department Views
            case 'neurology': return <DepartmentView department="Neurology" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'dermatology': return <DepartmentView department="Dermatology" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'surgery_medicine': return <DepartmentView department="Orthopedics" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'emergency': return <DepartmentView department="Emergency" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'cardiology': return <DepartmentView department="Cardiology" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'orthopedics': return <DepartmentView department="Orthopedics" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'general_medicine': return <DepartmentView department="General Medicine" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'pediatrics': return <DepartmentView department="Pediatrics" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;
            case 'gynecology': return <DepartmentView department="Gynecology" allPatients={patients} doctors={doctors} onPatientSelect={handlePatientSelect} />;

            // Patient Detail View
            case 'patient_detail':
                return selectedPatient ? (
                    <div>
                        <button 
                            onClick={handleBack} 
                            className="mb-4 flex items-center space-x-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5"/>
                            <span>Back</span>
                        </button>
                        <PatientDetailView patient={selectedPatient} />
                    </div>
                ) : (
                    <div className="text-center p-8">
                        <p className="text-gray-500">No patient selected. Please go to a department list.</p>
                        <button onClick={() => setActiveView('patient_list')} className="mt-4 font-medium text-srm-blue hover:underline">
                            Go to Patient List
                        </button>
                    </div>
                );

            // Clinical Views
            case 'patient_reports': return <PatientReportsView />;
            case 'case_history': return <CaseHistoryView patients={patients} onSelectPatient={handlePatientSelect} />;
            case 'tests_results': return <TestResultsView patients={myPatients} />;
            case 'diagnostic_tools': return <DiagnosticToolsView />;
            case 'current_status': return <CurrentStatusView />;
            case 'treatment_module': return <TreatmentModuleView />;

            // New Views
            case 'appointments_schedule': return <AppointmentsView patients={myPatients} onPatientSelect={handlePatientSelect} />;
            case 'messaging': return <MessagingView />;
            case 'notifications': return <NotificationsView />;
            case 'inventory_equipment': return <InventoryView />;
            case 'billing_insurance': return <BillingView />;
            case 'analytics_reports': return <AnalyticsView />;
            case 'settings_profile': return <SettingsProfileView />;
            case 'help_documentation': return <HelpView />;

            default: return <DashboardView onPatientSelect={handlePatientSelect} />;
        }
    };

    return (
        <div className="flex h-screen bg-srm-gray font-sans text-srm-darkgray">
            <DoctorSidebar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                doctors={doctors}
                patients={patients}
                currentDoctorId={doctor.id}
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                <Header title={getHeaderTitle()} onLogout={onLogout} userRole={`${doctor.name} (${userRole})`} />
                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};