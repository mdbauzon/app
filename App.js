import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const categories = [
  "Mathematics",
  "Theory and Practice of Surveying",
  "Property Surveying",
  "Cartography and Photogrammetry",
  "Laws on Natural Resources",
  "Geodesy, Geodetic Surveying and Least Squares",
  "Engineering Surveys and Construction Surveying",
  "Trivia Quiz",
];

const questionsData = {
  Mathematics: [
    {
      question: "In geodetic engineering, what is the main purpose of using spherical trigonometry?",
      options: [
        "To calculate volumes of solids",
        "To determine distances and angles on the Earth's surface",
        "To solve linear algebraic equations",
        "To analyze forces in structures"
      ],
      answer: "To determine distances and angles on the Earth's surface"
    },
    {
      question: "If the scale factor of a map is 1:50,000, what is the real-world distance represented by 3 cm on the map?",
      options: [
        "150 m",
        "1.5 km",
        "15 km",
        "150 km"
      ],
      answer: "1.5 km"
    },
    {
      question: "What is the formula to calculate the slope distance d between two points given the horizontal distance h and vertical difference v?",
      options: [
        "d = h - v",
        "d = √(h² + v²)",
        "d = h × v",
        "d = h / v"
      ],
      answer: "d = √(h² + v²)"
    },
    {
      question: "The Gaussian curvature K at a point on the Earth's surface is defined as:",
      options: [
        "The sum of the principal curvatures",
        "The product of the principal curvatures",
        "The difference between the principal curvatures",
        "The ratio of the principal curvatures"
      ],
      answer: "The product of the principal curvatures"
    },
    {
      question: "A geodetic survey measures a baseline of length 1000 m. If the measurement error is ±2 mm, what is the relative accuracy of the baseline?",
      options: [
        "1:500",
        "1:5,000",
        "1:50,000",
        "1:500,000"
      ],
      answer: "1:500,000"
    },
    {
      question: "The difference in latitude between two points on the Earth's surface is 0.5°. Approximately how many meters apart are they along a meridian?",
      options: [
        "55,500 m",
        "111,000 m",
        "222,000 m",
        "500 m"
      ],
      answer: "55,500 m"
    },
    {
      question: "What coordinate system is commonly used to express positions on the Earth's surface for geodetic purposes?",
      options: [
        "Cartesian coordinate system",
        "Polar coordinate system",
        "Geographic coordinate system (latitude and longitude)",
        "Cylindrical coordinate system"
      ],
      answer: "Geographic coordinate system (latitude and longitude)"
    },
    {
      question: "Which of the following methods is used to reduce the error in leveling measurements?",
      options: [
        "Repeated measurements and averaging",
        "Using a protractor instead of a theodolite",
        "Measuring only horizontal distances",
        "Ignoring atmospheric refraction"
      ],
      answer: "Repeated measurements and averaging"
    },
    {
      question: "The formula for the azimuth angle α between two points with coordinates (x₁,y₁) and (x₂,y₂) is:",
      options: [
        "tan α = (y₂ − y₁) / (x₂ − x₁)",
        "tan α = (x₂ − x₁) / (y₂ − y₁)",
        "α = √((x₂ − x₁)² + (y₂ − y₁)²)",
        "α = (x₂ + y₂) − (x₁ + y₁)"
      ],
      answer: "tan α = (y₂ − y₁) / (x₂ − x₁)"
    },
    {
      question: "When converting geodetic latitude to geocentric latitude, which mathematical function is used?",
      options: [
        "Sine",
        "Cosine",
        "Tangent",
        "Arctangent"
      ],
      answer: "Arctangent"
    }
  ],
  "Theory and Practice of Surveying": [
    {
      question: "What is the primary purpose of leveling in surveying?",
      options: [
        "To measure horizontal distances",
        "To establish a horizontal plane of reference for elevations",
        "To measure angles between two points",
        "To calculate area of a land parcel"
      ],
      answer: "To establish a horizontal plane of reference for elevations"
    },
    {
      question: "Which instrument is typically used to measure vertical angles in surveying?",
      options: [
        "Theodolite",
        "Chain",
        "Leveling staff",
        "Total station"
      ],
      answer: "Theodolite"
    },
    {
      question: "The process of transferring a known elevation from a benchmark to other points is called:",
      options: [
        "Traversing",
        "Leveling",
        "Triangulation",
        "Tacheometry"
      ],
      answer: "Leveling"
    },
    {
      question: "When conducting a survey, what does the term 'closing error' refer to?",
      options: [
        "Error when chaining a line",
        "The difference between the measured and actual length of a baseline",
        "The discrepancy between the start and end points of a closed traverse",
        "Instrument calibration error"
      ],
      answer: "The discrepancy between the start and end points of a closed traverse"
    },
    {
      question: "What is the recommended way to reduce cumulative error in a traverse survey?",
      options: [
        "Increase the number of measured angles",
        "Perform a traverse adjustment",
        "Use shorter chains",
        "Only measure horizontal angles"
      ],
      answer: "Perform a traverse adjustment"
    },
    {
      question: "Which of the following is a common method of distance measurement in the field?",
      options: [
        "GPS surveying",
        "Optical level",
        "Tachometer",
        "Chain or tape measurement"
      ],
      answer: "Chain or tape measurement"
    },
    {
      question: "The term 'backsight' in leveling refers to:",
      options: [
        "The reading taken on a rod held at the point of known elevation",
        "The final measurement in a level run",
        "The distance between two points",
        "The error due to refraction"
      ],
      answer: "The reading taken on a rod held at the point of known elevation"
    },
    {
      question: "What is the purpose of a 'plumb bob' in surveying?",
      options: [
        "To measure distances accurately",
        "To establish a vertical line or check verticality",
        "To measure angles",
        "To mark points on the ground"
      ],
      answer: "To establish a vertical line or check verticality"
    },
    {
      question: "Which of the following best describes a 'closed traverse'?",
      options: [
        "A traverse that starts and ends at different points",
        "A traverse that forms a loop, ending at the starting point or a known point",
        "A traverse where all sides are equal in length",
        "A traverse done only indoors"
      ],
      answer: "A traverse that forms a loop, ending at the starting point or a known point"
    },
    {
      question: "In surveying, the term 'chainage' refers to:",
      options: [
        "The angle between two survey lines",
        "The linear distance measured along a survey line from a fixed point",
        "The height difference between two points",
        "The error caused by misalignment"
      ],
      answer: "The linear distance measured along a survey line from a fixed point"
    }
  ],
  "Property Surveying": [
    {
      question: "What is the primary objective of a property survey?",
      options: [
        "To measure the height of buildings",
        "To establish the exact boundaries of a parcel of land",
        "To calculate the volume of soil",
        "To design road alignments"
      ],
      answer: "To establish the exact boundaries of a parcel of land"
    },
    {
      question: "What legal document typically contains the description of property boundaries?",
      options: [
        "Deed",
        "Tax receipt",
        "Survey sketch",
        "Building permit"
      ],
      answer: "Deed"
    },
    {
      question: "Which of the following is NOT usually included in a property survey report?",
      options: [
        "Boundary lines",
        "Easements and encroachments",
        "Soil composition report",
        "Location of improvements"
      ],
      answer: "Soil composition report"
    },
    {
      question: "The points marking the corners of a property are called:",
      options: [
        "Control points",
        "Benchmarks",
        "Monuments or boundary markers",
        "Stations"
      ],
      answer: "Monuments or boundary markers"
    },
    {
      question: "What is an easement in property surveying?",
      options: [
        "A restriction on property use",
        "A right granted to others to use part of the property for a specific purpose",
        "A physical boundary line",
        "The total area of the property"
      ],
      answer: "A right granted to others to use part of the property for a specific purpose"
    },
    {
      question: "If a property survey reveals an encroachment, it means:",
      options: [
        "The property is larger than documented",
        "Part of a structure crosses the property boundary onto a neighboring property",
        "The property has no legal boundaries",
        "The property is free from disputes"
      ],
      answer: "Part of a structure crosses the property boundary onto a neighboring property"
    },
    {
      question: "What type of survey is used when subdividing a large tract of land into smaller lots?",
      options: [
        "Topographic survey",
        "Subdivision survey",
        "Hydrographic survey",
        "Route survey"
      ],
      answer: "Subdivision survey"
    },
    {
      question: "What is the purpose of a 'metes and bounds' description in property surveying?",
      options: [
        "To give a visual map of the property",
        "To provide a detailed written description of the property boundaries using directions and distances",
        "To measure soil quality",
        "To locate underground utilities"
      ],
      answer: "To provide a detailed written description of the property boundaries using directions and distances"
    },
    {
      question: "What instrument is commonly used for precise angle and distance measurements in property surveys?",
      options: [
        "Leveling instrument",
        "Total station",
        "Barometer",
        "Altimeter"
      ],
      answer: "Total station"
    },
    {
      question: "Who is typically responsible for performing an official property survey?",
      options: [
        "Architect",
        "Surveyor licensed by the government",
        "Contractor",
        "Realtor"
      ],
      answer: "Surveyor licensed by the government"
    }
  ],
  "Cartography and Photogrammetry": [
    {
      question: "What is the main goal of cartography?",
      options: [
        "To take aerial photographs",
        "To create, design, and produce maps",
        "To analyze soil samples",
        "To measure elevation differences"
      ],
      answer: "To create, design, and produce maps"
    },
    {
      question: "Which of the following is a common projection used in cartography?",
      options: [
        "Mercator projection",
        "Isochronal projection",
        "Polynomial projection",
        "Spherical projection"
      ],
      answer: "Mercator projection"
    },
    {
      question: "In photogrammetry, what is the process of determining the geometric properties of objects from photographic images called?",
      options: [
        "Triangulation",
        "Rectification",
        "Measurement",
        "Interpretation"
      ],
      answer: "Measurement"
    },
    {
      question: "What is an important advantage of aerial photogrammetry over traditional ground surveying?",
      options: [
        "Less accuracy",
        "Faster data acquisition over large areas",
        "It requires no specialized equipment",
        "It does not need any processing"
      ],
      answer: "Faster data acquisition over large areas"
    },
    {
      question: "Which instrument is traditionally used to view stereo pairs of aerial photographs for 3D interpretation in photogrammetry?",
      options: [
        "Theodolite",
        "Stereoscope",
        "Leveling instrument",
        "Tachometer"
      ],
      answer: "Stereoscope"
    },
    {
      question: "What is a key characteristic of a topographic map?",
      options: [
        "Shows only political boundaries",
        "Shows elevation and landform features using contour lines",
        "Is always in black and white",
        "Only used for city planning"
      ],
      answer: "Shows elevation and landform features using contour lines"
    },
    {
      question: "Which of the following is NOT a type of map scale used in cartography?",
      options: [
        "Verbal scale",
        "Graphic scale",
        "Numerical scale",
        "Binary scale"
      ],
      answer: "Binary scale"
    },
    {
      question: "In photogrammetry, 'ground control points' (GCPs) are used to:",
      options: [
        "Control the flight of the drone",
        "Provide reference coordinates to accurately geo-reference images",
        "Mark locations of underground utilities",
        "Measure atmospheric pressure"
      ],
      answer: "Provide reference coordinates to accurately geo-reference images"
    },
    {
      question: "What does 'orthorectification' in photogrammetry refer to?",
      options: [
        "Adjusting aerial photos to remove distortions caused by terrain relief and camera tilt",
        "Enhancing colors of photos",
        "Measuring distances on a map",
        "Drawing contour lines"
      ],
      answer: "Adjusting aerial photos to remove distortions caused by terrain relief and camera tilt"
    },
    {
      question: "What does a contour line on a map represent",
      options: [
        "A path between two cities",
        "A line of equal elevation above a datum",
        "A boundary line",
        "A pipeline route"
      ],
      answer: "A line of equal elevation above a datum"
    }
  ],
  "Laws on Natural Resources": [
    {
      question: "Which Philippine law governs the disposition, management, and conservation of the country's natural resources including lands of the public domain?",
      options: [
        "Republic Act No. 9048",
        "Republic Act No. 7586 (National Integrated Protected Areas System Act)",
        "Presidential Decree No. 705 (Revised Forestry Code)",
        "Republic Act No. 8435 (Agriculture and Fisheries Modernization Act)"
      ],
      answer: "Presidential Decree No. 705 (Revised Forestry Code)"
    },
    {
      question: "Which government agency is primarily responsible for land surveying, titling, and cadastre in the Philippines?",
      options: [
        "DENR (Department of Environment and Natural Resources)",
        "PRC (Professional Regulation Commission)",
        "LTO (Land Transportation Office)",
        "BIR (Bureau of Internal Revenue)"
      ],
      answer: "DENR (Department of Environment and Natural Resources)"
    },
    {
      question: "What is the legal document that formally recognizes ownership of a land parcel in the Philippines?",
      options: [
        "Deed of Sale",
        "Transfer Certificate of Title (TCT)",
        "Survey Plan",
        "Tax Declaration"
      ],
      answer: "Transfer Certificate of Title (TCT)"
    },
    {
      question: "Under the Philippine Mining Act (Republic Act No. 7942), what is required before mining operations can commence on public lands?",
      options: [
        "An environmental compliance certificate (ECC)",
        "A contract of lease",
        "A cadastral survey approved by DENR",
        "All of the above"
      ],
      answer: "All of the above"
    },
    {
      question: "What is the primary purpose of cadastral surveying in relation to natural resources?",
      options: [
        "To locate mineral deposits",
        "To determine and define land boundaries for property and resource management",
        "To calculate water volume in rivers",
        "To map road alignments"
      ],
      answer: "To determine and define land boundaries for property and resource management"
    },
    {
      question: "Which law mandates the protection and conservation of forests, including the prohibition of illegal logging?",
      options: [
        "The National Integrated Protected Areas System Act (NIPAS)",
        "The Revised Forestry Code (PD 705)",
        "The Clean Water Act",
        "The Environmental Impact Statement System"
      ],
      answer: "The Revised Forestry Code (PD 705)"
    },
    {
      question: "The 'Public Land Act' (Commonwealth Act No. 141) regulates:",
      options: [
        "The acquisition and classification of public lands",
        "The ownership of private lands only",
        "Water rights exclusively",
        "Mining operations only"
      ],
      answer: "The acquisition and classification of public lands"
    },
    {
      question: "What is the significance of 'land classification' in geodetic engineering and natural resource management?",
      options: [
        "It determines the price of the land",
        "It identifies the allowable uses of a land parcel, such as agricultural, forest, residential, or commercial",
        "It measures soil fertility",
        "It marks flood-prone areas only"
      ],
      answer: "It identifies the allowable uses of a land parcel, such as agricultural, forest, residential, or commercial"
    },
    {
      question: "According to Philippine law, what must a geodetic engineer submit after a land survey related to natural resources?",
      options: [
        "An environmental impact report",
        "A survey plan and technical description for approval and registration",
        "A tax payment receipt",
        "A land title certificate"
      ],
      answer: "A survey plan and technical description for approval and registration"
    },
    {
      question: "Which international agreement influences Philippines' policies on the sustainable use of natural resources?",
      options: [
        "Kyoto Protocol",
        "Paris Agreement",
        "Convention on Biological Diversity (CBD)",
        "Geneva Conventions"
      ],
      answer: "Convention on Biological Diversity (CBD)"
    }
  ],
  "Geodesy, Geodetic Surveying and Least Squares": [
    {
      question: "What is the main objective of geodesy?",
      options: [
        "To design buildings",
        "To measure and understand the Earth's shape, gravity field, and rotation",
        "To perform construction surveying",
        "To map urban roads"
      ],
      answer: "To measure and understand the Earth's shape, gravity field, and rotation"
    },
    {
      question: "Geodetic surveying differs from plane surveying because it:",
      options: [
        "Assumes the Earth is flat",
        "Takes into account the curvature of the Earth",
        "Uses only GPS equipment",
        "Is less accurate"
      ],
      answer: "Takes into account the curvature of the Earth"
    },
    {
      question: "Which coordinate system is commonly used in geodetic surveying?",
      options: [
        "Cartesian coordinate system",
        "Geographic coordinate system (latitude, longitude, and height)",
        "Polar coordinate system",
        "Cylindrical coordinate system"
      ],
      answer: "Geographic coordinate system (latitude, longitude, and height)"
    },
    {
      question: "What is the purpose of using least squares adjustment in surveying?",
      options: [
        "To increase the number of observations",
        "To find the best fit solution minimizing the sum of squared errors in measurements",
        "To measure angles more accurately",
        "To reduce the size of the survey area"
      ],
      answer: "To find the best fit solution minimizing the sum of squared errors in measurements"
    },
    {
      question: "In a geodetic network, what is a 'control point'?",
      options: [
        "A point used for calculating volume",
        "A precisely measured point with known coordinates used as a reference for surveys",
        "A point located randomly in the field",
        "A point where the survey ends"
      ],
      answer: "A precisely measured point with known coordinates used as a reference for surveys"
    },
    {
      question: "What is the typical result of a least squares adjustment?",
      options: [
        "A single best estimate of unknown parameters with minimized residuals",
        "A graphical map of the area",
        "The sum of measured angles",
        "An elevation profile"
      ],
      answer: "A single best estimate of unknown parameters with minimized residuals"
    },
    {
      question: "In geodesy, the term 'datum' refers to:",
      options: [
        "A measurement instrument",
        "A reference surface or set of points used for calculating positions on Earth",
        "A type of projection",
        "A mathematical formula"
      ],
      answer: "A reference surface or set of points used for calculating positions on Earth"
    },
    {
      question: "What type of errors does the least squares method help to reduce?",
      options: [
        "Systematic errors only",
        "Random errors only",
        "Both systematic and random errors equally",
        "Neither, it only averages measurements"
      ],
      answer: "Random errors only"
    },
    { question: "Which mathematical technique is essential in processing geodetic measurements to obtain the most probable coordinates?",
      options: [
        "Differential calculus",
        "Least squares adjustment",
        "Linear interpolation",
        "Vector cross product"
      ],
      answer: "Least squares adjustment"
    },
    {
      question: "The flattening of the Earth is defined as:",
      options: [
        "The difference between the equatorial and polar radii divided by the equatorial radius",
        "The distance from the equator to the poles",
        "The height of the mountains above sea level",
        "The curvature of the Earth's surface"
      ],
      answer: "The difference between the equatorial and polar radii divided by the equatorial radius"
    }
  ],

  "Engineering Surveys and Construction Surveying": [
    {
      question: "What is the main purpose of an engineering survey?",
      options: [
        "To measure the height of buildings only",
        "To provide data for planning, design, and construction of engineering works",
        "To create geological maps",
        "To perform cadastral boundary surveys"
      ],
      answer: "To provide data for planning, design, and construction of engineering works"
    },
    {
      question: "Which type of survey is primarily used to establish points, lines, and elevations necessary for construction?",
      options: [
        "Topographic survey",
        "Construction survey",
        "Hydrographic survey",
        "Route survey"
      ],
      answer: "Construction survey"
    },
    {
      question: "What instrument is commonly used to transfer elevations from bench marks to construction points?",
      options: [
        "Theodolite",
        "Dumpy level or automatic level",
        "Total station",
        "GPS receiver"
      ],
      answer: "Dumpy level or automatic level"
    },
    {
      question: "In construction surveying, what does 'staking out' refer to?",
      options: [
        "Marking the location of structures on the ground",
        "Measuring soil compaction",
        "Calculating material quantities",
        "Recording daily weather data"
      ],
      answer: "Marking the location of structures on the ground"
    },
    {
      question: "Which of the following is NOT typically a task in construction surveying?",
      options: [
        "Establishing building corners",
        "Setting out excavation limits",
        "Designing structural elements",
        "Monitoring verticality and alignment of structures"
      ],
      answer: "Designing structural elements"
    },
    {
      question: "What is a 'benchmark' in construction surveying?",
      options: [
        "A reference point with a known elevation used as a starting point for leveling",
        "The highest point of a building",
        "A point marking property boundaries",
        "A measurement of soil strength"
      ],
      answer: "A reference point with a known elevation used as a starting point for leveling"
    },
    {
      question: "Which survey method is often used for laying out road alignments?",
      options: [
        "Traverse survey",
        "Triangulation survey",
        "Photogrammetric survey",
        "Leveling survey"
      ],
      answer: "Traverse survey"
    },
    {
      question: "What is the typical first step in a construction survey project?",
      options: [
        "Conducting a site reconnaissance and preliminary survey",
        "Pouring concrete foundations",
        "Installing utilities",
        "Conducting environmental impact studies"
      ],
      answer: "Conducting a site reconnaissance and preliminary survey"
    },
    {
      question: "During construction, how are deviations from design plan typically detected?",
      options: [
        "By daily inspections and surveying checks",
        "By reviewing the architectural drawings",
        "By calculating material costs",
        "By soil testing"
      ],
      answer: "By daily inspections and surveying checks"
    },
    {
      question: "How is the vertical control established on a construction site?",
      options: [
        "Using horizontal angles",
        "By referencing benchmarks and performing leveling",
        "By using GPS only",
        "By drawing plans"
      ],
      answer: "By referencing benchmarks and performing leveling"
    }
  ],
  "Trivia Quiz": [
    {
      question: "What instrument, invented in the 16th century, revolutionized angle measurement in surveying?",
      options: [
        "Theodolite",
        "Compass",
        "GPS",
        "Level"
      ],
      answer: "Theodolite"
    },
    {
      question: "Which satellite navigation system is most commonly used worldwide today in geodetic surveying?",
      options: [
        "GLONASS",
        "Galileo",
        "GPS",
        "Beidou"
      ],
      answer: "GPS"
    },
    {
      question: "What is the approximate circumference of the Earth?",
      options: [
        "20,000 km",
        "40,000 km",
        "60,000 km",
        "80,000 km"
      ],
      answer: "40,000 km"
    },
    {
      question: "Which famous explorer's voyages helped improve early maps and navigation?",
      options: [
        "Christopher Columbus",
        "Ferdinand Magellan",
        "Marco Polo",
        "Vasco da Gama"
      ],
      answer: "Ferdinand Magellan"
    },
    {
      question: "The study of measuring the Earth's gravitational field is called:",
      options: [
        "Cartography",
        "Geodesy",
        "Photogrammetry",
        "Topography"
      ],
      answer: "Geodesy"
    },
    {
      question: "What term describes the lines on a map that connect points of equal elevation?",
      options: [
        "Isobars",
        "Contour lines",
        "Meridians",
        "Parallels"
      ],
      answer: "Contour lines"
    },
    {
      question: "Which country was the first to use GPS technology for civilian use?",
      options: [
        "Russia",
        "United States",
        "China",
        "Japan"
      ],
      answer: "United States"
    },
    {
      question: "What famous French mathematician and physicist contributed to the least squares method used in surveying?",
      options: [
        "Isaac Newton",
        "Carl Friedrich Gauss",
        "Albert Einstein",
        "Blaise Pascal"
      ],
      answer: "Carl Friedrich Gauss"
    },
    {
      question: "What is the primary purpose of a benchmark in surveying?",
      options: [
        "To mark property corners",
        "To serve as a reference point for elevations",
        "To guide construction vehicles",
        "To locate underground utilities"
      ],
      answer: "To serve as a reference point for elevations"
    },
    {
      question: "Which technology allows the creation of 3D terrain models from aerial images?",
      options: [
        "GPS",
        "LiDAR",
        "Photogrammetry",
        "Total Station"
      ],
      answer: "Photogrammetry"
    }
  ]
};

function shuffleArray(array) {
  // Fisher-Yates shuffle
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start', 'categories', 'quiz', 'summary'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (screen === 'quiz' && selectedCategory) {
      // Shuffle questions when quiz starts
      const qs = questionsData[selectedCategory] || [];
      setShuffledQuestions(shuffleArray(qs));
      setQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
    }
  }, [screen, selectedCategory]);

  const currentQuestion = shuffledQuestions[questionIndex];

  const selectAnswer = (option) => {
    if (selectedAnswer) return; // Prevent changing after selection

    setSelectedAnswer(option);

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 < shuffledQuestions.length) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setScreen('summary');
    }
  };

  if (screen === 'start') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>TRUE</Text>
          <Text style={styles.title}>NORTH</Text>
          <Text style={styles.subtitle}>
            For Future{' '}
            <Text style={styles.emphasis}>Registered Geodetic Engineer</Text>{' '}
            Like You!
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setScreen('categories')}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'categories') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setScreen('start')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.selectTitle}>Choose a Category</Text>
          <ScrollView contentContainerStyle={styles.categoryList} showsVerticalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryButton}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedCategory(category);
                  setScreen('quiz');
                }}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  if (screen === 'quiz') {
    if (!currentQuestion) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.noQuestionsText}>No questions available for {selectedCategory}.</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => setScreen('categories')}>
              <Text style={styles.backButtonText}>← Back to Categories</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.quizContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setScreen('categories')}>
            <Text style={styles.backButtonText}>← Back to Categories</Text>
          </TouchableOpacity>

          <Text style={styles.quizCategory}>{selectedCategory}</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => {
              const isSelected = option === selectedAnswer;
              const isCorrect = option === currentQuestion.answer;
              let optionStyle = styles.optionButton;
              let textStyle = styles.optionText;

              if (selectedAnswer) {
                if (isSelected) {
                  optionStyle = isCorrect ? styles.correctOption : styles.incorrectOption;
                  textStyle = styles.optionTextSelected;
                } else if (isCorrect) {
                  // Show correct answer highlight if user selected wrong
                  optionStyle = styles.correctOption;
                  textStyle = styles.optionTextSelected;
                }
              }

              return (
                <TouchableOpacity
                  key={option}
                  style={optionStyle}
                  activeOpacity={0.7}
                  onPress={() => selectAnswer(option)}
                  disabled={!!selectedAnswer}
                >
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.nextButton, !selectedAnswer && styles.disabledButton]}
            onPress={handleNext}
            disabled={!selectedAnswer}
          >
            <Text style={styles.nextButtonText}>
              {questionIndex + 1 === shuffledQuestions.length ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'summary') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Quiz Complete!</Text>
          <Text style={styles.summaryScore}>
            Your score: {score} / {shuffledQuestions.length}
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setScreen('categories')}
          >
            <Text style={styles.startButtonText}>Try Another Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setScreen('start')}
          >
            <Text style={styles.startButtonText}>Return to Start</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  // Base layout
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0f1c',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Typography
  title: {
    fontSize: 60,
    fontWeight: '900',
    color: '#00f0ff',
    textShadowColor: '#00f0ff88',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 12,
    textAlign: 'center',
    color: '#9ae5ff',
  },
  emphasis: {
    fontWeight: 'bold',
    color: '#00ff88',
  },
  selectTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#00f0ff',
    textAlign: 'center',
    textShadowColor: '#00f0ff55',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  quizCategory: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#00f0ff',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#e0e0e0',
  },
  noQuestionsText: {
    fontSize: 20,
    color: '#ff4c4c',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#00ff88',
    marginBottom: 20,
    textShadowColor: '#00ff8899',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  summaryScore: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 40,
    color: '#ffffff',
  },

  // Buttons
  startButton: {
    marginTop: 40,
    backgroundColor: '#001f33',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6,
  },
  startButtonText: {
    color: '#00f0ff',
    fontSize: 18,
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#003344',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#555',
    borderColor: '#777',
  },
  nextButtonText: {
    color: '#00ff88',
    fontSize: 20,
    fontWeight: '700',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#00f0ff',
  },

  // Categories
  categoryContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#0a0f1c',
  },
  categoryList: {
    paddingBottom: 40,
  },
  categoryButton: {
    backgroundColor: '#001a33',
    paddingVertical: 14,
    marginVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 4,
  },
  categoryText: {
    color: '#00f0ff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Quiz Options — 🛠 FINAL FIXED VERSION
  quizContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#0a0f1c',
  },
  optionsContainer: {
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#101d2c',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#222', // neutral border
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 2,
  },
  correctOption: {
    backgroundColor: '#002f24',
    borderColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  incorrectOption: {
    backgroundColor: '#330000',
    borderColor: '#ff4c4c',
    shadowColor: '#ff4c4c',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#dff6ff',
  },
  optionTextSelected: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
  },

  // Summary
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0a0f1c',
  },
});