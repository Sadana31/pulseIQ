// ===============================
// HARD EMERGENCY PHRASES
// ===============================

const hardEmergencyPhrases = [
  "chest pain",
  "shortness of breath",
  "difficulty breathing",
  "unconscious",
  "severe bleeding",
  "heart attack",
  "stroke"
];


// ===============================
// CATEGORY + PRIORITY MAP
// ===============================

const symptomCategoryMap = {

  "stomach pain": { category: "Gastroenterology", priority: "Medium" },
  "diarrhea": { category: "Gastroenterology", priority: "Medium" },
  "food poisoning": { category: "Gastroenterology", priority: "Medium" },

  "leg pain": { category: "Orthopedics", priority: "Medium" },
  "joint pain": { category: "Orthopedics", priority: "Medium" },
  "sore muscles": { category: "Orthopedics", priority: "Low" },

  "cough": { category: "Respiratory", priority: "Medium" },
  "cold": { category: "Respiratory", priority: "Low" },
  "throat pain": { category: "ENT", priority: "Low" },

  "headache": { category: "Neurology", priority: "Medium" },
  "dizziness": { category: "Neurology", priority: "Medium" },

  "eyesight blurry": { category: "Ophthalmology", priority: "High" },
  "red eye": { category: "Ophthalmology", priority: "Low" },

  "ear pain": { category: "ENT", priority: "Low" },

  "tired": { category: "General Medicine", priority: "Low" },
  "nausea": { category: "General Medicine", priority: "Medium" },
  "no appetite": { category: "General Medicine", priority: "Low" },

  "itchiness": { category: "Dermatology", priority: "Low" },
  "overeating": { category: "General Medicine", priority: "Low" }
};


// ===============================
// DOCTOR SPECIALTY MAP
// ===============================

const doctorSpecialtyMap = {

  Cardiology: "Cardiologist",
  Gastroenterology: "Gastroenterologist",
  Orthopedics: "Orthopedic Doctor",
  Respiratory: "Pulmonologist",
  Neurology: "Neurologist",
  ENT: "ENT Specialist",
  Ophthalmology: "Eye Specialist",
  Dermatology: "Dermatologist",
  "General Medicine": "General Physician"

};


// ===============================
// PRIORITY QUEUE MAP
// ===============================

const priorityQueueMap = {

  High: {
    queue: "Emergency",
    waitTime: "Immediate consultation recommended"
  },

  Medium: {
    queue: "Urgent",
    waitTime: "Same day consultation recommended"
  },

  Low: {
    queue: "Normal",
    waitTime: "Schedule next available appointment"
  }

};


// ===============================
// SYMPTOM QUESTIONS
// ===============================

const symptomQuestions = {

  "stomach pain": [
    { q: "How long have you had the stomach pain?" },
    { q: "Is the pain constant or does it come and go?" },
    { q: "Are you experiencing nausea or vomiting?", note: "nausea or vomiting" }
  ],

  "leg pain": [
    { q: "Did the leg pain start after an injury?", note: "pain after injury" },
    { q: "Does walking make the pain worse?", note: "pain worsens when walking" },
    { q: "Is there swelling in the leg?", note: "leg swelling" }
  ],

  cough: [
    { q: "How long have you had the cough?" },
    { q: "Is the cough dry or producing mucus?" },
    { q: "Do you have fever along with the cough?", note: "fever with cough" }
  ],

  cold: [
    { q: "Do you have a runny or blocked nose?" },
    { q: "Do you have a fever?", note: "fever present" },
    { q: "Are you experiencing body aches?" }
  ],

  headache: [
    { q: "How severe is the headache?" },
    { q: "Did it start suddenly or gradually?" },
    { q: "Do you feel nausea or sensitivity to light?", note: "light sensitivity or nausea" }
  ],

  itchiness: [
    { q: "Where on the body are you experiencing itching?" },
    { q: "Do you notice rash or redness?", note: "rash or redness" },
    { q: "Did this start after using a new product or food?" }
  ],

  tired: [
    { q: "How long have you been feeling unusually tired?" },
    { q: "Are you sleeping well at night?" },
    { q: "Do you feel dizzy or weak along with fatigue?", note: "weakness or dizziness" }
  ],

  nausea: [
    { q: "How long have you been feeling nauseous?" },
    { q: "Have you vomited recently?", note: "vomiting present" },
    { q: "Did this start after eating something unusual?" }
  ],

  dizziness: [
    { q: "Does the dizziness happen when you stand up?", note: "dizziness on standing" },
    { q: "Do you feel like the room is spinning?", note: "possible vertigo" },
    { q: "Have you fainted or nearly fainted?", note: "near fainting episode" }
  ],

  diarrhea: [
    { q: "How long have you had diarrhea?" },
    { q: "Are you experiencing stomach cramps?", note: "stomach cramps" },
    { q: "Do you have fever along with it?", note: "fever present" }
  ],

  "food poisoning": [
    { q: "When did symptoms start after eating?" },
    { q: "Are you experiencing vomiting or diarrhea?", note: "vomiting or diarrhea" },
    { q: "Are you able to drink fluids without vomiting?" }
  ],

  "eyesight blurry": [
    { q: "Did the blurry vision start suddenly?", note: "sudden blurry vision" },
    { q: "Is it affecting one eye or both?" },
    { q: "Do you have headache along with it?" }
  ],

  "throat pain": [
    { q: "Is it painful to swallow?", note: "pain when swallowing" },
    { q: "Do you have fever along with throat pain?", note: "fever with throat pain" },
    { q: "Do you have cough?" }
  ],

  "sore muscles": [
    { q: "Did the soreness start after exercise?", note: "after exercise" },
    { q: "Is the soreness affecting multiple muscles?" },
    { q: "Does resting improve the pain?" }
  ],

  "ear pain": [
    { q: "Is the pain in one ear or both?" },
    { q: "Do you have fever or hearing difficulty?", note: "hearing difficulty" },
    { q: "Did the pain start after a cold?" }
  ],

  "red eye": [
    { q: "Is the redness in one eye or both?" },
    { q: "Do you feel itching or burning?", note: "eye irritation" },
    { q: "Is there discharge from the eye?", note: "eye discharge" }
  ],

  "joint pain": [
    { q: "Which joint is affected?" },
    { q: "Did the pain start after physical activity?" },
    { q: "Is there swelling or stiffness?", note: "joint swelling or stiffness" }
  ]
};


// ===============================
// DETECT SYMPTOM
// ===============================

function detectSymptom(message) {

  const symptoms = Object.keys(symptomQuestions);

  for (const s of symptoms) {
    if (message.includes(s)) return s;
  }

  return null;
}


// ===============================
// GIBBERISH CHECK
// ===============================

function looksLikeGibberish(text) {

  if (text.length < 2) return true;

  const repeated = /(.)\1{3,}/;
  if (repeated.test(text)) return true;

  if (!/[aeiou]/.test(text) && text.length > 4) return true;

  return false;
}


// ===============================
// BUILD TRIAGE DATA
// ===============================

function buildTriageSummary(state) {

  const symptom = state.symptom || "unspecified symptom";
  const notes = state.triageNotes || [];

  const categoryData = symptomCategoryMap[symptom] || {
    category: "General Medicine",
    priority: "Medium"
  };

  const doctor = doctorSpecialtyMap[categoryData.category] || "General Physician";

  const queueData = priorityQueueMap[categoryData.priority];

  return {

    primaryIssue: symptom,

    symptoms: notes,

    category: categoryData.category,

    priority: categoryData.priority,

    doctorType: doctor,

    queueLevel: queueData.queue,

    recommendedAction: queueData.waitTime

  };
}


// ===============================
// MAIN BOT LOGIC
// ===============================

export function classifyMessage(rawMessage, previousState = null) {

  const message = rawMessage.toLowerCase().trim();

  if (["hi","hello","hey"].includes(message)) {
    return {
      botResponse: "Hello! Please describe your symptoms.",
      state: previousState
    };
  }

  if (["bye","goodbye","exit"].includes(message)) {
    return {
      botResponse: "Take care! Feel free to return if you need help.",
      final: true
    };
  }

  if (hardEmergencyPhrases.some(p => message.includes(p))) {

    return {
      botResponse: "Critical symptoms detected. Please seek emergency care immediately.",
      emergency: true,
      navigate: "/emergency"
    };
  }

  if (looksLikeGibberish(message)) {

    return {
      botResponse: "Please clearly describe your symptoms.",
      state: previousState
    };
  }

  let state = previousState || {};

  state.symptom = state.symptom || null;
  state.askedQuestions = state.askedQuestions || [];
  state.triageNotes = state.triageNotes || [];

  if (!state.symptom) {

    const detected = detectSymptom(message);

    if (detected) state.symptom = detected;

    else {
      return {
        botResponse: "Could you describe your symptoms in more detail?",
        state
      };
    }
  }

  const questions = symptomQuestions[state.symptom];

  const next = questions.find(
    item => !state.askedQuestions.includes(item.q)
  );

  if (["yes","no"].includes(message) && state.askedQuestions.length) {

    const lastQ = state.askedQuestions[state.askedQuestions.length - 1];

    const qObj = questions.find(q => q.q === lastQ);

    if (message === "yes" && qObj?.note) {
      state.triageNotes.push(qObj.note);
    }
  }

  if (next) {

    state.askedQuestions.push(next.q);

    return {
      botResponse: next.q,
      state
    };
  }

  const triageData = buildTriageSummary(state);

  return {

    botResponse:
      "Based on your responses, I recommend scheduling a consultation.",

    final: true,

    showBookAppointment: true,

    triageSummary: triageData,

    primaryIssue: triageData.primaryIssue,

    symptoms: triageData.symptoms,

    category: triageData.category,

    priority: triageData.priority,

    doctorType: triageData.doctorType,

    queueLevel: triageData.queueLevel,

    recommendedAction: triageData.recommendedAction
  };
}