/* ============================================================
   ISZ Security Assessment Platform
   Ice Station Zebra LLC — Physical Security & AI Governance
   ============================================================ */

const AssessmentApp = {
  // ── State ──────────────────────────────────────────────────
  state: {
    currentStep: 'setup',
    projectInfo: {},
    selectedModules: [],
    currentModuleIndex: 0,
    currentItemIndex: 0,
    findings: {},
    startedAt: null
  },

  STORAGE_KEY: 'isz_assessment_state',

  // ── Module Definitions ─────────────────────────────────────
  modules: [
    {
      id: 'perimeter',
      name: 'Perimeter Security',
      description: 'Evaluate the physical boundary protections of the facility including fencing, barriers, and natural surveillance.',
      items: [
        {
          id: 'perimeter_fencing',
          name: 'Fencing & Physical Barriers',
          description: 'Condition, height, and adequacy of perimeter fencing, walls, or natural barriers.',
          solutions: ['Install or upgrade to 8ft+ anti-climb fencing', 'Add barbed wire or razor ribbon topping', 'Repair gaps, damaged sections, or undermined areas', 'Install anti-vehicle bollards at key points']
        },
        {
          id: 'perimeter_gates',
          name: 'Gates & Vehicle Entry Points',
          description: 'Security of vehicular and pedestrian gates, including control mechanisms and monitoring.',
          solutions: ['Install automated gate operators with access control', 'Add vehicle barriers or tire shredders', 'Deploy intercom and camera at gate positions', 'Implement visitor vehicle screening procedures']
        },
        {
          id: 'perimeter_landscaping',
          name: 'Natural Surveillance & Landscaping',
          description: 'Vegetation management and terrain features that affect security sight lines.',
          solutions: ['Trim vegetation to maintain clear sight lines', 'Apply CPTED (Crime Prevention Through Environmental Design) principles', 'Remove concealment opportunities near buildings', 'Install ground cover that deters foot traffic in restricted areas']
        },
        {
          id: 'perimeter_signage',
          name: 'Signage & Boundary Markers',
          description: 'Presence and condition of no-trespassing signs, property markers, and warning signage.',
          solutions: ['Install compliant no-trespassing signage at all entry points', 'Post warning signs for surveillance and security measures', 'Mark restricted areas clearly', 'Ensure signage meets local legal requirements']
        },
        {
          id: 'perimeter_lighting',
          name: 'Perimeter Lighting',
          description: 'Adequacy of lighting along the perimeter, including coverage gaps and light levels.',
          solutions: ['Install continuous perimeter lighting at 5+ foot-candles', 'Add motion-activated lighting in vulnerable areas', 'Eliminate dark spots and shadow zones', 'Implement timer and photocell controls for reliability']
        }
      ]
    },
    {
      id: 'access_control',
      name: 'Access Control',
      description: 'Assess the systems and procedures controlling who enters the facility and how access is managed.',
      items: [
        {
          id: 'ac_entry_points',
          name: 'Entry & Exit Points',
          description: 'Number, location, and security of all building entry and exit points.',
          solutions: ['Reduce the number of active entry points', 'Install mantraps or security vestibules at main entries', 'Deploy turnstiles or speed gates', 'Ensure all doors have proper closing and locking hardware']
        },
        {
          id: 'ac_electronic',
          name: 'Electronic Access Systems',
          description: 'Card readers, biometrics, keypads, and credential management systems.',
          solutions: ['Upgrade to encrypted smart card or mobile credentials', 'Deploy multi-factor authentication for sensitive areas', 'Implement anti-passback and anti-tailgating controls', 'Ensure all readers have tamper detection']
        },
        {
          id: 'ac_key_management',
          name: 'Key Management',
          description: 'Physical key control, distribution tracking, and lock hardware condition.',
          solutions: ['Implement a documented key control program', 'Install restricted keyway or high-security lock cylinders', 'Deploy electronic key cabinets with audit trails', 'Conduct regular key audits and rekey as needed']
        },
        {
          id: 'ac_visitor',
          name: 'Visitor Management',
          description: 'Procedures for screening, registering, badging, and escorting visitors.',
          solutions: ['Implement a visitor management system with photo badges', 'Require government-issued ID verification', 'Enforce escort policies for all non-badged visitors', 'Maintain digital visitor logs with search capability']
        },
        {
          id: 'ac_loading',
          name: 'Loading Docks & Service Entries',
          description: 'Security of shipping/receiving areas, service entrances, and utility access points.',
          solutions: ['Install roll-up door alarms and access controls', 'Deploy CCTV coverage at all dock positions', 'Implement vendor credentialing and scheduling', 'Secure utility access panels and mechanical rooms']
        }
      ]
    },
    {
      id: 'surveillance',
      name: 'Surveillance & Monitoring',
      description: 'Evaluate CCTV systems, monitoring capabilities, recording infrastructure, and analytics.',
      items: [
        {
          id: 'surv_coverage',
          name: 'Camera Coverage',
          description: 'Extent and adequacy of CCTV coverage across the facility.',
          solutions: ['Conduct a camera coverage study to identify blind spots', 'Add cameras at all entry/exit points and critical areas', 'Install PTZ cameras for flexible coverage', 'Deploy cameras with appropriate field-of-view for each location']
        },
        {
          id: 'surv_quality',
          name: 'Camera Quality & Technology',
          description: 'Resolution, low-light performance, and technology generation of camera equipment.',
          solutions: ['Upgrade to minimum 4MP IP cameras', 'Deploy cameras with IR or low-light capability', 'Install WDR cameras in high-contrast lighting areas', 'Replace analog systems with modern IP infrastructure']
        },
        {
          id: 'surv_recording',
          name: 'Recording & Storage',
          description: 'Video retention policies, storage capacity, and recording reliability.',
          solutions: ['Implement minimum 30-day retention policy', 'Deploy redundant NVR/storage systems', 'Enable motion-based recording to optimize storage', 'Implement off-site or cloud backup for critical footage']
        },
        {
          id: 'surv_monitoring',
          name: 'Monitoring Procedures',
          description: 'How video feeds are monitored, staffed, and integrated into security operations.',
          solutions: ['Staff a dedicated security operations center (SOC)', 'Implement video wall with priority camera rotation', 'Establish monitoring protocols and escalation procedures', 'Deploy alarm-triggered camera call-up integration']
        },
        {
          id: 'surv_analytics',
          name: 'Video Analytics & Integration',
          description: 'Use of analytics (motion detection, object tracking, facial recognition) and system integration.',
          solutions: ['Deploy video analytics for perimeter intrusion detection', 'Implement license plate recognition at vehicle entries', 'Integrate VMS with access control for event correlation', 'Consider people-counting and behavioral analytics']
        }
      ]
    },
    {
      id: 'lighting',
      name: 'Lighting',
      description: 'Assess lighting adequacy across all facility areas for security, safety, and operational needs.',
      items: [
        {
          id: 'light_exterior',
          name: 'Exterior & Building Lighting',
          description: 'Building-mounted and area lighting for exterior security coverage.',
          solutions: ['Install minimum 5 foot-candle lighting at all entries', 'Add wall-pack lighting on all building faces', 'Deploy pole-mounted area lights for open spaces', 'Use vandal-resistant fixtures in vulnerable locations']
        },
        {
          id: 'light_parking',
          name: 'Parking Area Lighting',
          description: 'Lighting levels and uniformity in parking lots, garages, and vehicle staging areas.',
          solutions: ['Achieve minimum 3 foot-candle average in parking areas', 'Ensure uniform lighting with no ratio greater than 4:1', 'Install lighting at parking garage stairwells and elevators', 'Add emergency call stations in large parking areas']
        },
        {
          id: 'light_interior',
          name: 'Interior Security Lighting',
          description: 'Lighting in lobbies, corridors, stairwells, and other interior security-critical areas.',
          solutions: ['Ensure all corridors and stairwells are well-lit', 'Install occupancy sensors in low-traffic areas', 'Maintain consistent lighting levels for CCTV performance', 'Add lighting in alcoves and blind corners']
        },
        {
          id: 'light_emergency',
          name: 'Emergency & Backup Lighting',
          description: 'Emergency lighting systems, battery backup, and generator-powered lighting.',
          solutions: ['Install emergency lighting on battery backup in all egress paths', 'Test emergency lighting monthly per code requirements', 'Deploy generator-backed lighting for critical security areas', 'Install photoluminescent exit path markers']
        },
        {
          id: 'light_maintenance',
          name: 'Lighting Maintenance Program',
          description: 'Preventive maintenance, lamp replacement schedules, and light-level monitoring.',
          solutions: ['Implement scheduled preventive maintenance program', 'Conduct annual foot-candle surveys', 'Maintain spare lamp inventory for rapid replacement', 'Upgrade to LED for reduced maintenance and better performance']
        }
      ]
    },
    {
      id: 'alarm',
      name: 'Alarm & Detection Systems',
      description: 'Evaluate intrusion detection, fire protection, duress alarms, and environmental monitoring.',
      items: [
        {
          id: 'alarm_intrusion',
          name: 'Intrusion Detection',
          description: 'Door contacts, motion sensors, glass-break detectors, and perimeter intrusion systems.',
          solutions: ['Install door contacts on all exterior and sensitive interior doors', 'Deploy motion sensors in after-hours areas', 'Add glass-break sensors on ground-floor windows', 'Implement perimeter detection (fence sensors, beam detectors)']
        },
        {
          id: 'alarm_fire',
          name: 'Fire Detection & Suppression',
          description: 'Fire alarm systems, smoke/heat detectors, sprinklers, and suppression systems.',
          solutions: ['Ensure fire alarm system meets current code requirements', 'Install smoke detectors in all occupied spaces', 'Deploy clean-agent suppression in server/data rooms', 'Conduct regular fire system inspections and testing']
        },
        {
          id: 'alarm_duress',
          name: 'Panic & Duress Alarms',
          description: 'Fixed and mobile duress systems for emergency situations.',
          solutions: ['Install fixed panic buttons at reception and security posts', 'Deploy mobile duress devices for at-risk personnel', 'Integrate duress alarms with CCTV camera call-up', 'Establish clear duress alarm response protocols']
        },
        {
          id: 'alarm_environmental',
          name: 'Environmental Monitoring',
          description: 'Water leak, temperature, humidity, and air quality sensors in critical areas.',
          solutions: ['Install water leak sensors in server rooms and basements', 'Deploy temperature and humidity monitors in sensitive areas', 'Add air quality sensors where chemical exposure is possible', 'Integrate environmental alerts with building management system']
        },
        {
          id: 'alarm_monitoring',
          name: 'System Monitoring & Response',
          description: 'Central station monitoring, alarm verification, and response procedures.',
          solutions: ['Contract with UL-listed central monitoring station', 'Implement alarm verification procedures to reduce false alarms', 'Establish response time standards and measure compliance', 'Test all alarm communication paths regularly']
        }
      ]
    },
    {
      id: 'interior',
      name: 'Interior Security',
      description: 'Assess security controls within the facility including sensitive areas, server rooms, and restricted zones.',
      items: [
        {
          id: 'int_sensitive',
          name: 'Sensitive Area Controls',
          description: 'Access restrictions and protections for executive offices, R&D labs, and classified areas.',
          solutions: ['Implement layered access control for sensitive areas', 'Deploy man-trap entries for highest-security zones', 'Install CCTV in all sensitive area corridors', 'Enforce clean-desk and clear-screen policies']
        },
        {
          id: 'int_server',
          name: 'Server & Data Room Security',
          description: 'Physical protections for IT infrastructure, network closets, and data centers.',
          solutions: ['Restrict server room access to authorized personnel only', 'Install environmental monitoring (temp, humidity, water)', 'Deploy rack-level access controls and cameras', 'Implement cable management and port security']
        },
        {
          id: 'int_safes',
          name: 'Safe & Vault Security',
          description: 'Adequacy of safes, vaults, and secure storage for valuables and sensitive materials.',
          solutions: ['Use TL-rated safes appropriate to contents value', 'Bolt safes to floor or wall structure', 'Implement dual-control access for highest-value items', 'Install vault door alarms and seismic sensors']
        },
        {
          id: 'int_office',
          name: 'General Office Security',
          description: 'Security measures in open office areas, mailrooms, and common spaces.',
          solutions: ['Implement badge-visible policies in all work areas', 'Secure mailroom with restricted access', 'Install locking cabinets for sensitive documents', 'Deploy motion-activated alarms for after-hours']
        },
        {
          id: 'int_vertical',
          name: 'Stairwell & Elevator Security',
          description: 'Access control and monitoring of vertical circulation within the building.',
          solutions: ['Install access control on stairwell doors', 'Deploy elevator access control by floor', 'Add CCTV in all elevator cabs and stairwells', 'Implement floor-restriction logic for elevators']
        }
      ]
    },
    {
      id: 'personnel',
      name: 'Security Personnel & Operations',
      description: 'Evaluate guard force deployment, training, patrol procedures, and operational readiness.',
      items: [
        {
          id: 'pers_deployment',
          name: 'Guard Force Deployment',
          description: 'Staffing levels, post assignments, shift coverage, and deployment strategy.',
          solutions: ['Conduct a staffing analysis based on threat assessment', 'Ensure 24/7 coverage at critical posts', 'Implement guard tour management system', 'Maintain adequate relief and backup staffing']
        },
        {
          id: 'pers_training',
          name: 'Training & Certification',
          description: 'Guard training programs, certifications, and ongoing education.',
          solutions: ['Implement mandatory pre-assignment training program', 'Require annual refresher training on all procedures', 'Ensure guards maintain required state certifications', 'Provide specialized training for emergency response']
        },
        {
          id: 'pers_patrol',
          name: 'Patrol Procedures',
          description: 'Patrol routes, frequency, randomization, and documentation.',
          solutions: ['Implement electronic guard tour system with checkpoints', 'Randomize patrol times and routes', 'Establish patrol frequency based on risk assessment', 'Review patrol reports daily for compliance']
        },
        {
          id: 'pers_comms',
          name: 'Communication Systems',
          description: 'Radio systems, intercom, and communication protocols for security operations.',
          solutions: ['Deploy digital radio system with encryption', 'Establish communication protocols and radio discipline', 'Install intercom systems at all security posts', 'Maintain backup communication methods']
        },
        {
          id: 'pers_incident',
          name: 'Incident Response Capability',
          description: 'Ability to detect, respond to, and document security incidents.',
          solutions: ['Develop comprehensive incident response procedures', 'Implement digital incident reporting system', 'Conduct regular tabletop and practical exercises', 'Establish mutual aid agreements with local law enforcement']
        }
      ]
    },
    {
      id: 'emergency',
      name: 'Emergency Preparedness',
      description: 'Evaluate emergency action plans, evacuation procedures, business continuity, and crisis management.',
      items: [
        {
          id: 'emrg_plans',
          name: 'Emergency Action Plans',
          description: 'Existence, completeness, and currency of emergency action plans for all hazards.',
          solutions: ['Develop all-hazards emergency action plan', 'Ensure plans address site-specific threats', 'Review and update plans annually minimum', 'Distribute plans and ensure employee awareness']
        },
        {
          id: 'emrg_evac',
          name: 'Evacuation Procedures',
          description: 'Evacuation routes, assembly points, accountability procedures, and ADA compliance.',
          solutions: ['Post evacuation maps at all exits and common areas', 'Designate and mark assembly points', 'Implement personnel accountability system', 'Provide evacuation assistance for persons with disabilities']
        },
        {
          id: 'emrg_continuity',
          name: 'Business Continuity',
          description: 'Plans and capabilities for maintaining critical operations during disruptions.',
          solutions: ['Develop business impact analysis for all functions', 'Establish alternate operating locations', 'Implement data backup and recovery procedures', 'Maintain emergency supply caches']
        },
        {
          id: 'emrg_crisis_comms',
          name: 'Crisis Communication',
          description: 'Mass notification systems, communication plans, and stakeholder messaging.',
          solutions: ['Deploy mass notification system (text, email, PA)', 'Develop pre-scripted crisis communication templates', 'Establish media communication protocols', 'Test notification systems quarterly']
        },
        {
          id: 'emrg_drills',
          name: 'Drills & Exercise Program',
          description: 'Frequency and quality of emergency drills, tabletops, and full-scale exercises.',
          solutions: ['Conduct fire drills at minimum frequency per code', 'Perform annual tabletop exercises for key scenarios', 'Execute full-scale exercise annually', 'Document lessons learned and implement improvements']
        }
      ]
    },
    {
      id: 'ai_governance',
      name: 'AI Governance & Security',
      description: 'Assess the organization\'s AI systems, governance frameworks, data protection, and compliance posture. This ISZ-exclusive module addresses the convergence of AI technology and physical security.',
      items: [
        {
          id: 'ai_inventory',
          name: 'AI System Inventory & Classification',
          description: 'Catalog of all AI/ML systems in use, their risk classifications, and ownership assignments.',
          solutions: ['Create comprehensive AI system registry with risk tiers', 'Classify AI systems per EU AI Act risk categories (Unacceptable, High, Limited, Minimal)', 'Assign system owners and accountability for each AI deployment', 'Document data sources, training methodologies, and deployment contexts']
        },
        {
          id: 'ai_data_privacy',
          name: 'AI Data Privacy & Protection',
          description: 'Data governance practices for AI training data, inference data, and model outputs.',
          solutions: ['Implement data minimization principles for AI training sets', 'Deploy differential privacy or federated learning where appropriate', 'Conduct Data Protection Impact Assessments (DPIAs) for AI systems', 'Establish data retention and deletion policies specific to AI/ML pipelines']
        },
        {
          id: 'ai_accountability',
          name: 'Algorithmic Transparency & Accountability',
          description: 'Explainability, auditability, and decision documentation for AI-driven processes.',
          solutions: ['Implement model cards and datasheets for all production AI systems', 'Deploy explainability tools (SHAP, LIME) for high-risk decision models', 'Establish algorithmic impact assessment process before deployment', 'Create audit trails for all automated decisions affecting individuals']
        },
        {
          id: 'ai_model_security',
          name: 'Model Security & Integrity',
          description: 'Protection of AI models against adversarial attacks, data poisoning, and unauthorized access.',
          solutions: ['Implement model signing and integrity verification', 'Deploy adversarial robustness testing in CI/CD pipeline', 'Monitor for data drift and model performance degradation', 'Restrict model access through API authentication and rate limiting']
        },
        {
          id: 'ai_access',
          name: 'AI-Specific Access Controls',
          description: 'Role-based access to AI systems, training infrastructure, and model management.',
          solutions: ['Implement RBAC for model training and deployment environments', 'Restrict access to training data repositories', 'Deploy privileged access management for AI infrastructure', 'Maintain audit logs of all model access and modifications']
        },
        {
          id: 'ai_ethics',
          name: 'Ethical AI & Bias Mitigation',
          description: 'Frameworks and practices for ensuring AI fairness, preventing bias, and maintaining ethical standards.',
          solutions: ['Establish an AI ethics board or review committee', 'Implement bias detection and fairness testing in model pipelines', 'Deploy continuous monitoring for output bias and drift', 'Create stakeholder feedback mechanisms for AI-affected populations']
        },
        {
          id: 'ai_incident',
          name: 'AI Incident Response & Monitoring',
          description: 'Procedures for detecting, responding to, and recovering from AI system failures or misuse.',
          solutions: ['Develop AI-specific incident response playbooks', 'Implement real-time monitoring for model anomalies and failures', 'Establish kill-switch and rollback procedures for critical AI systems', 'Create post-incident review process specific to AI failures']
        },
        {
          id: 'ai_compliance',
          name: 'Regulatory Compliance & Standards',
          description: 'Alignment with AI-specific regulations, standards, and frameworks (EU AI Act, NIST AI RMF, ISO 42001).',
          solutions: ['Map AI systems to applicable regulatory requirements', 'Implement NIST AI Risk Management Framework (AI RMF)', 'Pursue ISO/IEC 42001 AI Management System certification', 'Monitor evolving AI regulations and adjust governance accordingly']
        }
      ]
    }
  ],

  // ── Initialization ─────────────────────────────────────────
  init() {
    // Nothing to do on page load beyond availability
  },

  // ── Start New Assessment ───────────────────────────────────
  start() {
    this.state = {
      currentStep: 'setup',
      projectInfo: {},
      selectedModules: [],
      currentModuleIndex: 0,
      currentItemIndex: 0,
      findings: {},
      startedAt: new Date().toISOString()
    };
    this.showWizard();
    this.render();
  },

  // ── Load Saved Assessment ──────────────────────────────────
  loadSaved() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this.state = JSON.parse(saved);
        this.showWizard();
        this.render();
      } catch (e) {
        alert('No saved assessment found or data is corrupted.');
      }
    } else {
      alert('No saved assessment found. Start a new assessment.');
    }
  },

  // ── Save State ─────────────────────────────────────────────
  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
  },

  // ── Show/Hide Wizard ───────────────────────────────────────
  showWizard() {
    document.getElementById('assessment-landing').style.display = 'none';
    document.getElementById('assessment-wizard').style.display = 'block';
    window.scrollTo(0, 0);
  },

  showLanding() {
    document.getElementById('assessment-landing').style.display = 'block';
    document.getElementById('assessment-wizard').style.display = 'none';
    window.scrollTo(0, 0);
  },

  // ── Update Progress Bar ────────────────────────────────────
  updateProgress() {
    const steps = ['setup', 'modules', 'assess', 'review', 'report'];
    const currentIdx = steps.indexOf(this.state.currentStep);
    document.querySelectorAll('.assess-progress-step').forEach((el, i) => {
      el.classList.toggle('active', i <= currentIdx);
      el.classList.toggle('completed', i < currentIdx);
    });
    document.querySelectorAll('.assess-progress-connector').forEach((el, i) => {
      el.classList.toggle('active', i < currentIdx);
    });
  },

  // ── Main Render ────────────────────────────────────────────
  render() {
    this.updateProgress();
    const content = document.getElementById('wizard-content');
    switch (this.state.currentStep) {
      case 'setup': content.innerHTML = this.renderSetup(); break;
      case 'modules': content.innerHTML = this.renderModuleSelect(); break;
      case 'assess': content.innerHTML = this.renderAssessment(); break;
      case 'review': content.innerHTML = this.renderReview(); break;
      case 'report': content.innerHTML = this.renderReport(); break;
    }
    this.bindEvents();
  },

  // ── Bind Events ────────────────────────────────────────────
  bindEvents() {
    // Auto-save on any input change
    document.querySelectorAll('#wizard-content input, #wizard-content select, #wizard-content textarea').forEach(el => {
      el.addEventListener('change', () => this.save());
    });
  },

  // ── Step 1: Project Setup ──────────────────────────────────
  renderSetup() {
    const info = this.state.projectInfo;
    return `
      <div class="assess-wizard-section">
        <h2>Project Setup</h2>
        <p style="margin-bottom: 30px;">Enter the details for this security assessment project.</p>
        <div class="assess-form-grid">
          <div class="assess-form-group">
            <label>Client / Organization Name *</label>
            <input type="text" id="setup_client" value="${this.esc(info.client || '')}" placeholder="Acme Corporation" required>
          </div>
          <div class="assess-form-group">
            <label>Facility Name *</label>
            <input type="text" id="setup_facility" value="${this.esc(info.facility || '')}" placeholder="Main Campus Building A" required>
          </div>
          <div class="assess-form-group">
            <label>Facility Address</label>
            <input type="text" id="setup_address" value="${this.esc(info.address || '')}" placeholder="123 Main St, Pittsburgh, PA 15201">
          </div>
          <div class="assess-form-group">
            <label>Facility Type</label>
            <select id="setup_type">
              <option value="">Select type...</option>
              ${['Corporate Office', 'Manufacturing', 'Warehouse / Distribution', 'Data Center', 'Healthcare Facility', 'Educational Institution', 'Government Building', 'Retail Location', 'Research Laboratory', 'Mixed Use', 'Other'].map(t =>
                `<option value="${t}" ${info.type === t ? 'selected' : ''}>${t}</option>`
              ).join('')}
            </select>
          </div>
          <div class="assess-form-group">
            <label>Assessor Name *</label>
            <input type="text" id="setup_assessor" value="${this.esc(info.assessor || '')}" placeholder="Jane Doe, CPP">
          </div>
          <div class="assess-form-group">
            <label>Assessment Date *</label>
            <input type="date" id="setup_date" value="${info.date || new Date().toISOString().split('T')[0]}">
          </div>
          <div class="assess-form-group assess-form-full">
            <label>Scope & Notes</label>
            <textarea id="setup_scope" rows="3" placeholder="Brief description of assessment scope, areas included/excluded, special considerations...">${this.esc(info.scope || '')}</textarea>
          </div>
        </div>
        <div class="assess-wizard-actions">
          <button class="btn btn-secondary" onclick="AssessmentApp.showLanding()">Cancel</button>
          <button class="btn btn-primary" onclick="AssessmentApp.saveSetup()">Next: Select Modules</button>
        </div>
      </div>
    `;
  },

  saveSetup() {
    const client = document.getElementById('setup_client').value.trim();
    const facility = document.getElementById('setup_facility').value.trim();
    const assessor = document.getElementById('setup_assessor').value.trim();
    const date = document.getElementById('setup_date').value;

    if (!client || !facility || !assessor || !date) {
      alert('Please fill in all required fields (marked with *).');
      return;
    }

    this.state.projectInfo = {
      client,
      facility,
      address: document.getElementById('setup_address').value.trim(),
      type: document.getElementById('setup_type').value,
      assessor,
      date,
      scope: document.getElementById('setup_scope').value.trim()
    };
    this.state.currentStep = 'modules';
    this.save();
    this.render();
    window.scrollTo(0, 0);
  },

  // ── Step 2: Module Selection ───────────────────────────────
  renderModuleSelect() {
    return `
      <div class="assess-wizard-section">
        <h2>Select Assessment Modules</h2>
        <p style="margin-bottom: 10px;">Choose which security domains to include in this assessment. Select all that apply to the facility.</p>
        <div class="assess-select-actions" style="margin-bottom: 20px;">
          <button class="btn btn-outline" style="padding: 8px 16px; font-size: 14px;" onclick="AssessmentApp.selectAllModules()">Select All</button>
          <button class="btn btn-outline" style="padding: 8px 16px; font-size: 14px;" onclick="AssessmentApp.deselectAllModules()">Deselect All</button>
        </div>
        <div class="assess-module-select-grid">
          ${this.modules.map(mod => `
            <label class="assess-module-checkbox ${mod.id === 'ai_governance' ? 'assess-module-exclusive' : ''} ${this.state.selectedModules.includes(mod.id) ? 'selected' : ''}">
              <input type="checkbox" value="${mod.id}" ${this.state.selectedModules.includes(mod.id) ? 'checked' : ''} onchange="AssessmentApp.toggleModule('${mod.id}', this.checked)">
              <div class="assess-module-checkbox-content">
                <strong>${mod.name}</strong>
                ${mod.id === 'ai_governance' ? '<span class="assess-module-badge" style="margin-left: 8px;">ISZ Exclusive</span>' : ''}
                <p>${mod.description}</p>
                <span class="assess-item-count">${mod.items.length} assessment items</span>
              </div>
            </label>
          `).join('')}
        </div>
        <div class="assess-wizard-actions">
          <button class="btn btn-secondary" onclick="AssessmentApp.goToStep('setup')">Back</button>
          <button class="btn btn-primary" onclick="AssessmentApp.startAssessment()">Begin Assessment</button>
        </div>
      </div>
    `;
  },

  toggleModule(id, checked) {
    if (checked && !this.state.selectedModules.includes(id)) {
      this.state.selectedModules.push(id);
    } else if (!checked) {
      this.state.selectedModules = this.state.selectedModules.filter(m => m !== id);
    }
    // Update visual state
    document.querySelectorAll('.assess-module-checkbox').forEach(el => {
      const input = el.querySelector('input');
      el.classList.toggle('selected', input.checked);
    });
    this.save();
  },

  selectAllModules() {
    this.state.selectedModules = this.modules.map(m => m.id);
    this.save();
    this.render();
  },

  deselectAllModules() {
    this.state.selectedModules = [];
    this.save();
    this.render();
  },

  startAssessment() {
    if (this.state.selectedModules.length === 0) {
      alert('Please select at least one module.');
      return;
    }
    this.state.currentStep = 'assess';
    this.state.currentModuleIndex = 0;
    this.state.currentItemIndex = 0;

    // Initialize findings for selected modules
    this.state.selectedModules.forEach(modId => {
      const mod = this.modules.find(m => m.id === modId);
      if (mod && !this.state.findings[modId]) {
        this.state.findings[modId] = {};
        mod.items.forEach(item => {
          this.state.findings[modId][item.id] = {
            status: '',
            likelihood: 3,
            impact: 3,
            controls: 3,
            notes: '',
            selectedSolutions: []
          };
        });
      }
    });

    this.save();
    this.render();
    window.scrollTo(0, 0);
  },

  // ── Step 3: Assessment ─────────────────────────────────────
  renderAssessment() {
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);
    const mod = selectedMods[this.state.currentModuleIndex];
    if (!mod) {
      this.state.currentStep = 'review';
      this.save();
      this.render();
      return '';
    }

    const item = mod.items[this.state.currentItemIndex];
    const finding = this.state.findings[mod.id] && this.state.findings[mod.id][item.id] || {};

    const totalItems = selectedMods.reduce((sum, m) => sum + m.items.length, 0);
    let completedItems = 0;
    for (let i = 0; i < this.state.currentModuleIndex; i++) {
      completedItems += selectedMods[i].items.length;
    }
    completedItems += this.state.currentItemIndex;
    const progress = Math.round((completedItems / totalItems) * 100);

    const riskScore = this.calcItemRisk(finding);
    const riskLevel = this.getRiskLevel(riskScore);

    return `
      <div class="assess-wizard-section">
        <div class="assess-survey-header">
          <div>
            <h2>${mod.name}</h2>
            <p style="margin-bottom: 0;">Item ${this.state.currentItemIndex + 1} of ${mod.items.length} &mdash; Module ${this.state.currentModuleIndex + 1} of ${selectedMods.length}</p>
          </div>
          <div class="assess-overall-progress">
            <div class="assess-overall-progress-bar">
              <div class="assess-overall-progress-fill" style="width: ${progress}%;"></div>
            </div>
            <span>${progress}% complete</span>
          </div>
        </div>

        <div class="assess-item-card">
          <h3>${item.name}</h3>
          <p>${item.description}</p>

          <!-- Status -->
          <div class="assess-field-group">
            <label class="assess-field-label">Current Status</label>
            <div class="assess-status-options">
              ${['Compliant', 'Partial', 'Non-Compliant', 'N/A'].map(s => `
                <label class="assess-status-btn ${finding.status === s ? 'active' : ''} assess-status-${s.toLowerCase().replace(/[^a-z]/g, '')}">
                  <input type="radio" name="status" value="${s}" ${finding.status === s ? 'checked' : ''} onchange="AssessmentApp.updateFinding('status', '${s}')">
                  ${s}
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Risk Scoring -->
          <div class="assess-risk-scoring">
            <div class="assess-risk-row">
              <div class="assess-slider-group">
                <label class="assess-field-label">Likelihood <span class="assess-slider-val">${finding.likelihood || 3}</span></label>
                <input type="range" min="1" max="5" value="${finding.likelihood || 3}" class="assess-slider" oninput="AssessmentApp.updateFinding('likelihood', parseInt(this.value)); this.previousElementSibling.querySelector('.assess-slider-val').textContent = this.value; AssessmentApp.updateRiskDisplay();">
                <div class="assess-slider-labels"><span>Rare</span><span>Unlikely</span><span>Possible</span><span>Likely</span><span>Certain</span></div>
              </div>
              <div class="assess-slider-group">
                <label class="assess-field-label">Impact <span class="assess-slider-val">${finding.impact || 3}</span></label>
                <input type="range" min="1" max="5" value="${finding.impact || 3}" class="assess-slider" oninput="AssessmentApp.updateFinding('impact', parseInt(this.value)); this.previousElementSibling.querySelector('.assess-slider-val').textContent = this.value; AssessmentApp.updateRiskDisplay();">
                <div class="assess-slider-labels"><span>Negligible</span><span>Minor</span><span>Moderate</span><span>Major</span><span>Catastrophic</span></div>
              </div>
              <div class="assess-slider-group">
                <label class="assess-field-label">Control Effectiveness <span class="assess-slider-val">${finding.controls || 3}</span></label>
                <input type="range" min="1" max="5" value="${finding.controls || 3}" class="assess-slider" oninput="AssessmentApp.updateFinding('controls', parseInt(this.value)); this.previousElementSibling.querySelector('.assess-slider-val').textContent = this.value; AssessmentApp.updateRiskDisplay();">
                <div class="assess-slider-labels"><span>None</span><span>Weak</span><span>Moderate</span><span>Strong</span><span>Full</span></div>
              </div>
            </div>
            <div class="assess-risk-result" id="risk-result">
              <span class="risk-badge risk-${riskLevel.class}">${riskLevel.label}</span>
              <span class="assess-risk-score">Risk Score: ${riskScore}</span>
            </div>
          </div>

          <!-- Solutions -->
          <div class="assess-field-group">
            <label class="assess-field-label">Recommended Solutions</label>
            <div class="assess-solutions-list">
              ${item.solutions.map((sol, i) => `
                <label class="assess-solution-item ${(finding.selectedSolutions || []).includes(i) ? 'selected' : ''}">
                  <input type="checkbox" ${(finding.selectedSolutions || []).includes(i) ? 'checked' : ''} onchange="AssessmentApp.toggleSolution(${i}, this.checked)">
                  <span>${sol}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Notes -->
          <div class="assess-field-group">
            <label class="assess-field-label">Notes & Observations</label>
            <textarea class="assess-notes" rows="3" placeholder="Document specific findings, conditions observed, location details, or additional context..." oninput="AssessmentApp.updateFinding('notes', this.value)">${this.esc(finding.notes || '')}</textarea>
          </div>
        </div>

        <!-- Navigation -->
        <div class="assess-wizard-actions">
          <button class="btn btn-secondary" onclick="AssessmentApp.prevItem()">
            ${this.state.currentItemIndex === 0 && this.state.currentModuleIndex === 0 ? 'Back to Modules' : 'Previous'}
          </button>
          <div class="assess-nav-center">
            <button class="btn btn-outline" style="padding: 10px 20px;" onclick="AssessmentApp.skipToReview()">Skip to Review</button>
          </div>
          <button class="btn btn-primary" onclick="AssessmentApp.nextItem()">
            ${this.state.currentItemIndex === mod.items.length - 1 && this.state.currentModuleIndex === selectedMods.length - 1 ? 'Finish & Review' : 'Next'}
          </button>
        </div>

        <!-- Module Quick Nav -->
        <div class="assess-module-nav">
          <p style="margin-bottom: 10px; font-size: 14px; color: var(--text-muted);">Jump to module:</p>
          <div class="assess-module-pills">
            ${selectedMods.map((m, i) => `
              <button class="assess-pill ${i === this.state.currentModuleIndex ? 'active' : ''}" onclick="AssessmentApp.jumpToModule(${i})">${m.name}</button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  updateFinding(field, value) {
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);
    const mod = selectedMods[this.state.currentModuleIndex];
    const item = mod.items[this.state.currentItemIndex];

    if (!this.state.findings[mod.id]) this.state.findings[mod.id] = {};
    if (!this.state.findings[mod.id][item.id]) {
      this.state.findings[mod.id][item.id] = { status: '', likelihood: 3, impact: 3, controls: 3, notes: '', selectedSolutions: [] };
    }

    this.state.findings[mod.id][item.id][field] = value;
    this.save();

    // Update status button visuals
    if (field === 'status') {
      document.querySelectorAll('.assess-status-btn').forEach(btn => {
        btn.classList.toggle('active', btn.querySelector('input').value === value);
      });
    }
  },

  toggleSolution(index, checked) {
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);
    const mod = selectedMods[this.state.currentModuleIndex];
    const item = mod.items[this.state.currentItemIndex];
    const finding = this.state.findings[mod.id][item.id];

    if (!finding.selectedSolutions) finding.selectedSolutions = [];
    if (checked && !finding.selectedSolutions.includes(index)) {
      finding.selectedSolutions.push(index);
    } else if (!checked) {
      finding.selectedSolutions = finding.selectedSolutions.filter(i => i !== index);
    }

    // Update visual
    document.querySelectorAll('.assess-solution-item').forEach((el, i) => {
      el.classList.toggle('selected', finding.selectedSolutions.includes(i));
    });

    this.save();
  },

  updateRiskDisplay() {
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);
    const mod = selectedMods[this.state.currentModuleIndex];
    const item = mod.items[this.state.currentItemIndex];
    const finding = this.state.findings[mod.id][item.id];
    const score = this.calcItemRisk(finding);
    const level = this.getRiskLevel(score);
    const resultEl = document.getElementById('risk-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <span class="risk-badge risk-${level.class}">${level.label}</span>
        <span class="assess-risk-score">Risk Score: ${score}</span>
      `;
    }
  },

  nextItem() {
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);
    const mod = selectedMods[this.state.currentModuleIndex];

    if (this.state.currentItemIndex < mod.items.length - 1) {
      this.state.currentItemIndex++;
    } else if (this.state.currentModuleIndex < selectedMods.length - 1) {
      this.state.currentModuleIndex++;
      this.state.currentItemIndex = 0;
    } else {
      this.state.currentStep = 'review';
    }
    this.save();
    this.render();
    window.scrollTo(0, 0);
  },

  prevItem() {
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);

    if (this.state.currentItemIndex > 0) {
      this.state.currentItemIndex--;
    } else if (this.state.currentModuleIndex > 0) {
      this.state.currentModuleIndex--;
      const prevMod = selectedMods[this.state.currentModuleIndex];
      this.state.currentItemIndex = prevMod.items.length - 1;
    } else {
      this.state.currentStep = 'modules';
    }
    this.save();
    this.render();
    window.scrollTo(0, 0);
  },

  jumpToModule(index) {
    this.state.currentModuleIndex = index;
    this.state.currentItemIndex = 0;
    this.save();
    this.render();
    window.scrollTo(0, 0);
  },

  skipToReview() {
    this.state.currentStep = 'review';
    this.save();
    this.render();
    window.scrollTo(0, 0);
  },

  goToStep(step) {
    this.state.currentStep = step;
    this.save();
    this.render();
    window.scrollTo(0, 0);
  },

  // ── Risk Calculation ───────────────────────────────────────
  calcItemRisk(finding) {
    if (!finding || finding.status === 'N/A' || finding.status === 'Compliant') return 0;
    const l = finding.likelihood || 3;
    const i = finding.impact || 3;
    const c = finding.controls || 3;
    // Inherent risk minus control offset
    const inherent = l * i;
    const offset = Math.floor((c - 1) * (inherent / 5));
    return Math.max(1, inherent - offset);
  },

  getRiskLevel(score) {
    if (score === 0) return { label: 'N/A', class: 'na' };
    if (score >= 20) return { label: 'Critical', class: 'critical' };
    if (score >= 15) return { label: 'High', class: 'high' };
    if (score >= 9) return { label: 'Medium', class: 'medium' };
    if (score >= 4) return { label: 'Low', class: 'low' };
    return { label: 'Minimal', class: 'minimal' };
  },

  getModuleScore(modId) {
    const mod = this.modules.find(m => m.id === modId);
    if (!mod || !this.state.findings[modId]) return { avg: 0, max: 0, items: [] };

    const scores = mod.items.map(item => {
      const finding = this.state.findings[modId][item.id];
      return { item, score: this.calcItemRisk(finding), finding };
    });

    const scoredItems = scores.filter(s => s.score > 0);
    const avg = scoredItems.length > 0 ? Math.round(scoredItems.reduce((sum, s) => sum + s.score, 0) / scoredItems.length) : 0;
    const max = scoredItems.length > 0 ? Math.max(...scoredItems.map(s => s.score)) : 0;

    return { avg, max, items: scores };
  },

  getOverallScore() {
    const moduleScores = this.state.selectedModules.map(id => this.getModuleScore(id));
    const allScored = moduleScores.filter(m => m.avg > 0);
    if (allScored.length === 0) return 0;
    return Math.round(allScored.reduce((sum, m) => sum + m.avg, 0) / allScored.length);
  },

  // ── Step 4: Review ─────────────────────────────────────────
  renderReview() {
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);
    const overallScore = this.getOverallScore();
    const overallLevel = this.getRiskLevel(overallScore);

    // Collect all findings sorted by risk
    let allFindings = [];
    selectedMods.forEach(mod => {
      const modScore = this.getModuleScore(mod.id);
      modScore.items.forEach(({ item, score, finding }) => {
        if (score > 0) {
          allFindings.push({ module: mod.name, item, score, finding, modId: mod.id });
        }
      });
    });
    allFindings.sort((a, b) => b.score - a.score);

    return `
      <div class="assess-wizard-section">
        <h2>Assessment Review</h2>
        <p style="margin-bottom: 30px;">Review your findings across all assessed modules. You can return to any module to make changes.</p>

        <!-- Overall Score -->
        <div class="assess-overall-score-card">
          <div class="assess-overall-left">
            <h3>Overall Risk Posture</h3>
            <span class="risk-badge risk-${overallLevel.class}" style="font-size: 18px; padding: 8px 20px;">${overallLevel.label}</span>
            <p style="margin-top: 10px;">Average Risk Score: <strong>${overallScore}</strong> / 25</p>
          </div>
          <div class="assess-overall-right">
            <p><strong>${this.state.projectInfo.client}</strong></p>
            <p>${this.state.projectInfo.facility}</p>
            <p>${this.state.projectInfo.date}</p>
            <p>Assessor: ${this.state.projectInfo.assessor}</p>
          </div>
        </div>

        <!-- Module Scores -->
        <h3 style="margin-top: 40px;">Module Scores</h3>
        <div class="assess-module-scores">
          ${selectedMods.map((mod, i) => {
            const ms = this.getModuleScore(mod.id);
            const lvl = this.getRiskLevel(ms.avg);
            const completionCount = ms.items.filter(it => it.finding && it.finding.status).length;
            return `
              <div class="assess-module-score-row">
                <div class="assess-module-score-info">
                  <strong>${mod.name}</strong>
                  <span class="assess-completion">${completionCount}/${mod.items.length} items assessed</span>
                </div>
                <div class="assess-module-score-bar-wrap">
                  <div class="assess-module-score-bar">
                    <div class="assess-module-score-fill risk-bg-${lvl.class}" style="width: ${Math.min(100, (ms.avg / 25) * 100)}%;"></div>
                  </div>
                </div>
                <span class="risk-badge risk-${lvl.class}">${ms.avg > 0 ? lvl.label + ' (' + ms.avg + ')' : 'N/A'}</span>
                <button class="btn btn-outline" style="padding: 6px 14px; font-size: 13px;" onclick="AssessmentApp.jumpToModule(${i}); AssessmentApp.state.currentStep='assess'; AssessmentApp.save(); AssessmentApp.render();">Edit</button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Top Findings -->
        ${allFindings.length > 0 ? `
          <h3 style="margin-top: 40px;">Top Findings by Risk</h3>
          <div class="assess-findings-table">
            <div class="assess-findings-header">
              <span>Finding</span>
              <span>Module</span>
              <span>Status</span>
              <span>Risk</span>
            </div>
            ${allFindings.slice(0, 15).map(f => {
              const lvl = this.getRiskLevel(f.score);
              return `
                <div class="assess-findings-row">
                  <span>${f.item.name}</span>
                  <span class="assess-findings-module">${f.module}</span>
                  <span class="assess-status-pill assess-status-${(f.finding.status || '').toLowerCase().replace(/[^a-z]/g, '')}">${f.finding.status || 'Not Set'}</span>
                  <span class="risk-badge risk-${lvl.class}">${lvl.label} (${f.score})</span>
                </div>
              `;
            }).join('')}
          </div>
        ` : '<p style="margin-top: 40px;">No findings have been recorded yet. Return to the assessment to evaluate items.</p>'}

        <div class="assess-wizard-actions">
          <button class="btn btn-secondary" onclick="AssessmentApp.goToStep('assess')">Back to Assessment</button>
          <button class="btn btn-primary" onclick="AssessmentApp.goToStep('report')">Generate Report</button>
        </div>
      </div>
    `;
  },

  // ── Step 5: Report ─────────────────────────────────────────
  renderReport() {
    const info = this.state.projectInfo;
    const selectedMods = this.state.selectedModules.map(id => this.modules.find(m => m.id === id)).filter(Boolean);
    const overallScore = this.getOverallScore();
    const overallLevel = this.getRiskLevel(overallScore);

    // Collect all actionable findings
    let allFindings = [];
    selectedMods.forEach(mod => {
      const modScore = this.getModuleScore(mod.id);
      modScore.items.forEach(({ item, score, finding }) => {
        allFindings.push({ module: mod, item, score, finding, modId: mod.id });
      });
    });
    const actionableFindings = allFindings.filter(f => f.score > 0).sort((a, b) => b.score - a.score);

    // Count by risk level
    const riskCounts = { critical: 0, high: 0, medium: 0, low: 0, minimal: 0 };
    actionableFindings.forEach(f => {
      const lvl = this.getRiskLevel(f.score);
      if (riskCounts[lvl.class] !== undefined) riskCounts[lvl.class]++;
    });

    return `
      <div class="assess-wizard-section">
        <div class="assess-report-actions no-print">
          <button class="btn btn-primary" onclick="window.print()">Print / Save as PDF</button>
          <button class="btn btn-secondary" onclick="AssessmentApp.goToStep('review')">Back to Review</button>
          <button class="btn btn-outline" onclick="AssessmentApp.showLanding()">Exit to Home</button>
        </div>

        <div class="assess-report" id="assessment-report">
          <!-- Report Header -->
          <div class="assess-report-header">
            <h1>Physical Security &amp; AI Governance Assessment Report</h1>
            <div class="assess-report-meta">
              <div>
                <p><strong>Client:</strong> ${this.esc(info.client)}</p>
                <p><strong>Facility:</strong> ${this.esc(info.facility)}</p>
                <p><strong>Address:</strong> ${this.esc(info.address || 'Not specified')}</p>
                <p><strong>Facility Type:</strong> ${this.esc(info.type || 'Not specified')}</p>
              </div>
              <div>
                <p><strong>Assessor:</strong> ${this.esc(info.assessor)}</p>
                <p><strong>Date:</strong> ${info.date}</p>
                <p><strong>Modules Assessed:</strong> ${selectedMods.length}</p>
                <p><strong>Total Items Evaluated:</strong> ${allFindings.length}</p>
              </div>
            </div>
          </div>

          <!-- Executive Summary -->
          <div class="assess-report-section">
            <h2>Executive Summary</h2>
            <div class="assess-executive-summary">
              <div class="assess-exec-score">
                <span class="risk-badge risk-${overallLevel.class}" style="font-size: 20px; padding: 10px 24px;">${overallLevel.label}</span>
                <p>Overall Risk Score: <strong>${overallScore}</strong> / 25</p>
              </div>
              <div class="assess-exec-counts">
                <div class="assess-count-item">
                  <span class="assess-count-num risk-text-critical">${riskCounts.critical}</span>
                  <span>Critical</span>
                </div>
                <div class="assess-count-item">
                  <span class="assess-count-num risk-text-high">${riskCounts.high}</span>
                  <span>High</span>
                </div>
                <div class="assess-count-item">
                  <span class="assess-count-num risk-text-medium">${riskCounts.medium}</span>
                  <span>Medium</span>
                </div>
                <div class="assess-count-item">
                  <span class="assess-count-num risk-text-low">${riskCounts.low}</span>
                  <span>Low</span>
                </div>
                <div class="assess-count-item">
                  <span class="assess-count-num risk-text-minimal">${riskCounts.minimal}</span>
                  <span>Minimal</span>
                </div>
              </div>
            </div>
            ${info.scope ? `<p style="margin-top: 20px;"><strong>Assessment Scope:</strong> ${this.esc(info.scope)}</p>` : ''}
          </div>

          <!-- Risk Heat Map -->
          <div class="assess-report-section">
            <h2>Risk Heat Map</h2>
            <div class="assess-heatmap">
              <div class="assess-heatmap-ylabel">Impact &rarr;</div>
              <div class="assess-heatmap-grid">
                ${this.renderHeatMap(allFindings)}
              </div>
              <div class="assess-heatmap-xlabel">Likelihood &rarr;</div>
            </div>
          </div>

          <!-- Module Details -->
          ${selectedMods.map(mod => {
            const ms = this.getModuleScore(mod.id);
            const lvl = this.getRiskLevel(ms.avg);
            return `
              <div class="assess-report-section">
                <h2>${mod.name} ${mod.id === 'ai_governance' ? '<span class="assess-module-badge">ISZ Exclusive</span>' : ''}</h2>
                <div class="assess-module-summary-bar">
                  <span>Module Risk: <span class="risk-badge risk-${lvl.class}">${ms.avg > 0 ? lvl.label + ' (' + ms.avg + ')' : 'N/A'}</span></span>
                  <span>Peak Risk: ${ms.max > 0 ? ms.max + '/25' : 'N/A'}</span>
                </div>
                <table class="assess-report-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Status</th>
                      <th>L</th>
                      <th>I</th>
                      <th>C</th>
                      <th>Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ms.items.map(({ item, score, finding }) => {
                      const ilvl = this.getRiskLevel(score);
                      return `
                        <tr>
                          <td>${item.name}</td>
                          <td><span class="assess-status-pill assess-status-${(finding.status || '').toLowerCase().replace(/[^a-z]/g, '')}">${finding.status || '—'}</span></td>
                          <td>${finding.likelihood || '—'}</td>
                          <td>${finding.impact || '—'}</td>
                          <td>${finding.controls || '—'}</td>
                          <td><span class="risk-badge risk-${ilvl.class}">${score > 0 ? score : '—'}</span></td>
                        </tr>
                        ${finding.notes ? `<tr class="assess-notes-row"><td colspan="6"><em>Notes:</em> ${this.esc(finding.notes)}</td></tr>` : ''}
                        ${(finding.selectedSolutions || []).length > 0 ? `
                          <tr class="assess-solutions-row"><td colspan="6"><em>Recommended:</em> ${finding.selectedSolutions.map(si => item.solutions[si]).filter(Boolean).join('; ')}</td></tr>
                        ` : ''}
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            `;
          }).join('')}

          <!-- Prioritized Recommendations -->
          ${actionableFindings.length > 0 ? `
            <div class="assess-report-section">
              <h2>Prioritized Recommendations</h2>
              <p>The following recommendations are ordered by risk score, with the highest-priority items listed first.</p>
              <ol class="assess-recommendations">
                ${actionableFindings.filter(f => (f.finding.selectedSolutions || []).length > 0).slice(0, 20).map(f => {
                  const lvl = this.getRiskLevel(f.score);
                  const solutions = f.finding.selectedSolutions.map(si => f.item.solutions[si]).filter(Boolean);
                  return `
                    <li class="assess-rec-item">
                      <div class="assess-rec-header">
                        <strong>${f.item.name}</strong>
                        <span class="risk-badge risk-${lvl.class}">${lvl.label} (${f.score})</span>
                      </div>
                      <span class="assess-rec-module">${f.module.name}</span>
                      <ul>${solutions.map(s => `<li>${s}</li>`).join('')}</ul>
                    </li>
                  `;
                }).join('')}
              </ol>
            </div>
          ` : ''}

          <!-- Compliance Alignment -->
          <div class="assess-report-section">
            <h2>Compliance & Standards Alignment</h2>
            <p>This assessment methodology aligns with the following frameworks and standards:</p>
            <div class="assess-compliance-grid">
              <div class="assess-compliance-item">
                <strong>ASIS Physical Security</strong>
                <p>ASIS International standards for physical security measures and best practices.</p>
              </div>
              <div class="assess-compliance-item">
                <strong>NIST Cybersecurity Framework</strong>
                <p>Identify, Protect, Detect, Respond, and Recover functions for cyber-physical security.</p>
              </div>
              ${this.state.selectedModules.includes('ai_governance') ? `
                <div class="assess-compliance-item">
                  <strong>NIST AI RMF</strong>
                  <p>NIST AI Risk Management Framework for governing AI system risks.</p>
                </div>
                <div class="assess-compliance-item">
                  <strong>EU AI Act</strong>
                  <p>European Union Artificial Intelligence Act risk classification and requirements.</p>
                </div>
                <div class="assess-compliance-item">
                  <strong>ISO/IEC 42001</strong>
                  <p>AI Management System standard for responsible AI governance.</p>
                </div>
              ` : ''}
              <div class="assess-compliance-item">
                <strong>CPTED</strong>
                <p>Crime Prevention Through Environmental Design principles for physical security.</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="assess-report-footer">
            <p><strong>CONFIDENTIAL</strong> — This report was prepared by Ice Station Zebra LLC for the exclusive use of ${this.esc(info.client)}.</p>
            <p>Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} &mdash; Ice Station Zebra LLC &mdash; Pittsburgh, PA</p>
            <p style="margin-top: 10px;"><em>"Security is a process, not a product."</em></p>
          </div>
        </div>

        <div class="assess-report-actions no-print" style="margin-top: 30px;">
          <button class="btn btn-primary" onclick="window.print()">Print / Save as PDF</button>
          <button class="btn btn-secondary" onclick="AssessmentApp.goToStep('review')">Back to Review</button>
        </div>
      </div>
    `;
  },

  // ── Heat Map Renderer ──────────────────────────────────────
  renderHeatMap(allFindings) {
    // 5x5 grid: rows = impact (5 top to 1 bottom), cols = likelihood (1 left to 5 right)
    const grid = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => []));

    allFindings.forEach(f => {
      if (f.finding && f.finding.likelihood && f.finding.impact && f.score > 0) {
        const row = 5 - f.finding.impact; // invert so 5 is top
        const col = f.finding.likelihood - 1;
        grid[row][col].push(f);
      }
    });

    let html = '';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const impact = 5 - r;
        const likelihood = c + 1;
        const cellScore = likelihood * impact;
        const level = this.getRiskLevel(cellScore);
        const count = grid[r][c].length;
        html += `<div class="assess-heatmap-cell risk-bg-${level.class}" title="L:${likelihood} I:${impact} — ${count} item(s)">
          ${count > 0 ? `<span class="assess-heatmap-count">${count}</span>` : ''}
        </div>`;
      }
    }
    return html;
  },

  // ── Utilities ──────────────────────────────────────────────
  esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => AssessmentApp.init());
