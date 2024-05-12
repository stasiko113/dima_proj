// src/routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Test from '../components/Test';
import Report from '../components/Report';
import Documents from '../components/Documents';
import CollectInformationData from '../components/Test/components/collectInformationData'
import CollectMeansOfProtectionData from '../components/Test/components/collectMeansOfProtectionData'
import CollectQuestionnaireData from '../components/Test/components/collectQuestionnaireData'
import CollectComplianceOrdersData from '../components/Test/components/collectComplianceOrdersData'
import CollectRequirementsData from '../components/Test/components/collectRequirementsData'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/report" element={<Report />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/test/collect-information-data" element={<CollectInformationData />} />
      <Route path="/test/collect-means-of-protection-data" element={<CollectMeansOfProtectionData />} />
      <Route path="/test/collect-questionnaire-data" element={<CollectQuestionnaireData />} />
      <Route path="/test/collect-compliance-orders-data" element={<CollectComplianceOrdersData />} />
      <Route path="/test/collect-requirements-data" element={<CollectRequirementsData />} />
    </Routes>
  );
}
export default AppRoutes;
