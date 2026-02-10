export const dataAnalysisMissions = [
  {
    id: 101,
    title: "Clean Messy Data",
    description: "Fix formatting issues, missing values, and duplicates in a sales dataset.",
    difficulty: 1,
    difficultyLabel: "Beginner",
    category: "Data Cleaning",
    objective: "Learn data cleaning fundamentals",
    skill: "Data hygiene and preprocessing",
    problem: "Clean a messy sales dataset with formatting errors, missing data, and duplicates",
    setup: "You've inherited a sales dataset from a colleague who didn't follow data entry standards.",
    excelFile: {
      name: "Messy_Sales_Data.xlsx",
      sheets: [{
        name: "Raw_Data",
        columns: ["Customer_ID", "Name", "Email", "Purchase_Date", "Product", "Quantity", "Unit_Price", "Total_Amount"],
        rows: 50,
        sampleData: [
          { Customer_ID: "C001", Name: "John Smith", Email: "john.smith@email.com", Purchase_Date: "2024-01-15", Product: "Widget A", Quantity: 5, Unit_Price: 29.99, Total_Amount: 149.95 },
          { Customer_ID: "C001", Name: "John Smith", Email: "john.smith@email.com", Purchase_Date: "2024-01-15", Product: "Widget A", Quantity: 5, Unit_Price: 29.99, Total_Amount: 149.95 },
          { Customer_ID: "C003", Name: "BOB JOHNSON", Email: "bob.johnson@email.com", Purchase_Date: "2024/01/17", Product: "widget c", Quantity: 2, Unit_Price: 15.00, Total_Amount: 30.00 }
        ]
      }]
    },
    phases: {
      setup: { title: "Mission Briefing", description: "Data cleaning is 80% of data analysis work.", tips: ["Look for inconsistent formats", "Identify duplicates", "Check for missing values"] },
      upload: { title: "Upload Dataset", description: "Upload the Excel file and identify issues.", tips: ["Ask AI to scan for duplicates", "Request missing value summary"] },
      analysis: { title: "Clean the Data", description: "Use AI to clean systematically.", tips: ["Request deduplication strategy", "Standardize formats"] },
      insights: { title: "Validate", description: "Verify cleaned data is ready.", tips: ["Check duplicates removed", "Verify formatting"] }
    },
    aiPartner: { name: "Data Scrubber", personality: "meticulous", description: "Data quality specialist" },
    skillBadge: { name: "Data Cleaner", description: "Master of data hygiene", icon: "Sparkles" },
    estimatedTime: "15-20 min",
    xpReward: 150
  },
  {
    id: 102,
    title: "Sort & Filter Basics",
    description: "Organize data effectively using AI-assisted sorting and filtering.",
    difficulty: 1,
    difficultyLabel: "Beginner",
    category: "Data Organization",
    objective: "Master sorting and filtering",
    skill: "Data organization",
    problem: "Organize customer feedback to identify priorities",
    setup: "Your company collected 200 customer feedback responses.",
    excelFile: {
      name: "Customer_Feedback.xlsx",
      sheets: [{
        name: "Feedback",
        columns: ["Response_ID", "Date", "Customer_Type", "Rating", "Category", "Feedback_Text", "Priority"],
        rows: 200,
        sampleData: [
          { Response_ID: 1, Date: "2024-01-15", Customer_Type: "VIP", Rating: 2, Category: "Support", Feedback_Text: "Wait time too long", Priority: "High" },
          { Response_ID: 2, Date: "2024-01-15", Customer_Type: "New", Rating: 5, Category: "Product", Feedback_Text: "Love it!", Priority: "Low" }
        ]
      }]
    },
    phases: {
      setup: { title: "Mission Briefing", description: "Sorting and filtering reveal insights.", tips: ["Use multiple filters", "Sort by different columns"] },
      upload: { title: "Upload", description: "Upload feedback data.", tips: ["Get dataset overview", "Identify column types"] },
      analysis: { title: "Filter & Sort", description: "Extract insights.", tips: ["Filter high-priority VIP feedback", "Sort by rating"] },
      insights: { title: "Find Patterns", description: "Discover trends.", tips: ["Which category has most negative feedback?", "Compare customer types"] }
    },
    aiPartner: { name: "Query Master", personality: "organized", description: "Database expert" },
    skillBadge: { name: "Sort Sage", description: "Expert in data organization", icon: "Filter" },
    estimatedTime: "12-18 min",
    xpReward: 150
  },
  {
    id: 103,
    title: "Calculate Simple Metrics",
    description: "Calculate sum, average, count, and percentages using AI.",
    difficulty: 2,
    difficultyLabel: "Beginner",
    category: "Statistics",
    objective: "Learn basic calculations",
    skill: "Descriptive statistics",
    problem: "Calculate key metrics from sales data",
    setup: "You're a business analyst summarizing monthly sales.",
    excelFile: {
      name: "Monthly_Sales.xlsx",
      sheets: [{
        name: "Transactions",
        columns: ["Transaction_ID", "Date", "Product", "Region", "Units", "Revenue", "Cost"],
        rows: 100,
        sampleData: [
          { Transaction_ID: "TXN001", Date: "2024-01-05", Product: "Electronics", Region: "North", Units: 12, Revenue: 3600, Cost: 2400 },
          { Transaction_ID: "TXN002", Date: "2024-01-08", Product: "Clothing", Region: "South", Units: 25, Revenue: 1250, Cost: 750 }
        ]
      }]
    },
    phases: {
      setup: { title: "Briefing", description: "Metrics turn raw data into insights.", tips: ["Know which metrics matter", "Understand calculations"] },
      upload: { title: "Upload", description: "Upload sales data.", tips: ["Get column summaries", "Identify numeric fields"] },
      analysis: { title: "Calculate", description: "Compute key metrics.", tips: ["Total revenue by region", "Average units per transaction"] },
      insights: { title: "Interpret", description: "Understand what metrics mean.", tips: ["Compare regions", "Identify top products"] }
    },
    aiPartner: { name: "The Calculator", personality: "precise", description: "Statistics expert" },
    skillBadge: { name: "Metric Master", description: "Skilled at calculating insights", icon: "Calculator" },
    estimatedTime: "10-15 min",
    xpReward: 200
  },
  {
    id: 104,
    title: "Spot Outliers",
    description: "Identify unusual patterns and anomalies in customer behavior data.",
    difficulty: 3,
    difficultyLabel: "Intermediate",
    category: "Statistical Analysis",
    objective: "Learn outlier detection",
    skill: "Anomaly detection",
    problem: "Find outliers in website analytics to detect fraud or technical issues",
    setup: "Your analytics dashboard shows unusual traffic spikes you need to investigate.",
    excelFile: {
      name: "Website_Analytics.xlsx",
      sheets: [{
        name: "Daily_Stats",
        columns: ["Date", "Visitors", "Page_Views", "Avg_Session_Min", "Bounce_Rate_Pct", "Conversions"],
        rows: 90,
        sampleData: [
          { Date: "2024-01-01", Visitors: 1240, Page_Views: 3800, Avg_Session_Min: 4.2, Bounce_Rate_Pct: 42, Conversions: 35 },
          { Date: "2024-01-02", Visitors: 1350, Page_Views: 4100, Avg_Session_Min: 4.5, Bounce_Rate_Pct: 40, Conversions: 41 },
          { Date: "2024-01-03", Visitors: 8900, Page_Views: 15200, Avg_Session_Min: 1.2, Bounce_Rate_Pct: 78, Conversions: 12 },
          { Date: "2024-01-04", Visitors: 1280, Page_Views: 3950, Avg_Session_Min: 4.3, Bounce_Rate_Pct: 41, Conversions: 38 }
        ]
      }]
    },
    phases: {
      setup: { title: "Briefing", description: "Outliers can be problems or opportunities.", tips: ["Use statistical methods", "Consider context", "Don't just delete"] },
      upload: { title: "Upload", description: "Upload 90 days of analytics.", tips: ["Get statistical summary", "Identify normal ranges"] },
      analysis: { title: "Detect Outliers", description: "Find anomalies using AI.", tips: ["Z-score method", "IQR method", "Visual inspection"] },
      insights: { title: "Investigate", description: "Determine if outliers matter.", tips: ["Check dates", "Look for patterns"] }
    },
    aiPartner: { name: "The Detective", personality: "curious", description: "Anomaly hunter" },
    skillBadge: { name: "Outlier Spotter", description: "Expert at finding anomalies", icon: "Search" },
    estimatedTime: "18-25 min",
    xpReward: 250
  },
  {
    id: 105,
    title: "Analyze Trends",
    description: "Identify patterns over time and forecast future performance.",
    difficulty: 3,
    difficultyLabel: "Intermediate",
    category: "Time Series",
    objective: "Master trend analysis",
    skill: "Time series analysis",
    problem: "Identify sales trends to inform inventory planning",
    setup: "Your retail business needs to predict demand for next quarter.",
    excelFile: {
      name: "Quarterly_Sales.xlsx",
      sheets: [{
        name: "Sales_Data",
        columns: ["Week", "Product_Category", "Units_Sold", "Revenue", "Marketing_Spend", "Weather_Score"],
        rows: 52,
        sampleData: [
          { Week: "2024-W01", Product_Category: "Winter_Coats", Units_Sold: 245, Revenue: 36750, Marketing_Spend: 5000, Weather_Score: 8 },
          { Week: "2024-W02", Product_Category: "Winter_Coats", Units_Sold: 198, Revenue: 29700, Marketing_Spend: 4500, Weather_Score: 6 },
          { Week: "2024-W15", Product_Category: "Spring_Jackets", Units_Sold: 312, Revenue: 46800, Marketing_Spend: 6000, Weather_Score: 7 },
          { Week: "2024-W30", Product_Category: "Summer_Tees", Units_Sold: 580, Revenue: 17400, Marketing_Spend: 8000, Weather_Score: 9 }
        ]
      }]
    },
    phases: {
      setup: { title: "Briefing", description: "Trends show where you're headed.", tips: ["Look for seasonality", "Identify growth patterns"] },
      upload: { title: "Upload", description: "Upload 52 weeks of sales data.", tips: ["Chart the data", "Identify time patterns"] },
      analysis: { title: "Find Trends", description: "Analyze patterns.", tips: ["Moving averages", "Growth rates", "Seasonal effects"] },
      insights: { title: "Forecast", description: "Predict future performance.", tips: ["Project next quarter", "Confidence intervals"] }
    },
    aiPartner: { name: "Trend Watcher", personality: "insightful", description: "Forecasting specialist" },
    skillBadge: { name: "Trend Tracker", description: "Skilled at pattern recognition", icon: "TrendingUp" },
    estimatedTime: "20-30 min",
    xpReward: 300
  },
  {
    id: 106,
    title: "Compare Groups",
    description: "Compare performance across segments, regions, or demographics.",
    difficulty: 3,
    difficultyLabel: "Intermediate",
    category: "Comparative Analysis",
    objective: "Learn comparative analysis",
    skill: "Group comparison",
    problem: "Compare marketing campaign performance across regions",
    setup: "You ran the same campaign in 5 regions with different results.",
    excelFile: {
      name: "Campaign_Results.xlsx",
      sheets: [{
        name: "Regional_Data",
        columns: ["Region", "Population_M", "Budget_K", "Impressions_K", "Clicks_K", "Conversions", "Cost_Per_Conversion"],
        rows: 25,
        sampleData: [
          { Region: "Northeast", Population_M: 55, Budget_K: 150, Impressions_K: 2500, Clicks_K: 45, Conversions: 1800, Cost_Per_Conversion: 83 },
          { Region: "Southeast", Population_M: 78, Budget_K: 180, Impressions_K: 3200, Clicks_K: 72, Conversions: 2400, Cost_Per_Conversion: 75 },
          { Region: "Midwest", Population_M: 68, Budget_K: 140, Impressions_K: 2100, Clicks_K: 38, Conversions: 950, Cost_Per_Conversion: 147 },
          { Region: "Southwest", Population_M: 42, Budget_K: 120, Impressions_K: 2800, Clicks_K: 84, Conversions: 2100, Cost_Per_Conversion: 57 },
          { Region: "West", Population_M: 48, Budget_K: 200, Impressions_K: 4100, Clicks_K: 123, Conversions: 3200, Cost_Per_Conversion: 63 }
        ]
      }]
    },
    phases: {
      setup: { title: "Briefing", description: "Comparisons reveal what's working.", tips: ["Normalize for size", "Use rates not totals", "Statistical significance"] },
      upload: { title: "Upload", description: "Upload campaign data.", tips: ["Understand metrics", "Identify baselines"] },
      analysis: { title: "Compare", description: "Analyze regional differences.", tips: ["Rank by efficiency", "Calculate per-capita metrics"] },
      insights: { title: "Recommend", description: "Allocate budget better.", tips: ["ROI analysis", "Scaling recommendations"] }
    },
    aiPartner: { name: "The Comparator", personality: "analytical", description: "Segmentation expert" },
    skillBadge: { name: "Comparison Pro", description: "Expert at group analysis", icon: "GitCompare" },
    estimatedTime: "18-25 min",
    xpReward: 275
  },
  {
    id: 107,
    title: "Forecast Sales",
    description: "Build predictive models to forecast revenue and demand.",
    difficulty: 4,
    difficultyLabel: "Advanced",
    category: "Predictive Analytics",
    objective: "Learn forecasting techniques",
    skill: "Predictive modeling",
    problem: "Forecast next quarter's sales to optimize inventory",
    setup: "Your supply chain team needs accurate demand predictions.",
    excelFile: {
      name: "Historical_Sales.xlsx",
      sheets: [{
        name: "Monthly_Data",
        columns: ["Month", "Product_Line", "Units_Sold", "Price_Point", "Promotion_Active", "Competitor_Price", "Economic_Index"],
        rows: 36,
        sampleData: [
          { Month: "2022-01", Product_Line: "Premium", Units_Sold: 1200, Price_Point: 299, Promotion_Active: 0, Competitor_Price: 289, Economic_Index: 105 },
          { Month: "2022-02", Product_Line: "Premium", Units_Sold: 1150, Price_Point: 299, Promotion_Active: 0, Competitor_Price: 279, Economic_Index: 104 },
          { Month: "2023-06", Product_Line: "Standard", Units_Sold: 3400, Price_Point: 149, Promotion_Active: 1, Competitor_Price: 159, Economic_Index: 98 },
          { Month: "2023-12", Product_Line: "Premium", Units_Sold: 2100, Price_Point: 279, Promotion_Active: 1, Competitor_Price: 289, Economic_Index: 110 }
        ]
      }]
    },
    phases: {
      setup: { title: "Briefing", description: "Forecasts inform decisions with uncertainty.", tips: ["Multiple methods", "Confidence intervals", "Scenario planning"] },
      upload: { title: "Upload", description: "Upload 3 years of sales history.", tips: ["Identify drivers", "Check data quality"] },
      analysis: { title: "Build Model", description: "Create forecasting model.", tips: ["Time series decomposition", "Regression analysis", "Seasonal adjustments"] },
      insights: { title: "Validate", description: "Test accuracy and present.", tips: ["Back-testing", "Error metrics", "Executive summary"] }
    },
    aiPartner: { name: "The Forecaster", personality: "methodical", description: "Prediction specialist" },
    skillBadge: { name: "Prediction Guru", description: "Master of forecasting", icon: "Target" },
    estimatedTime: "30-45 min",
    xpReward: 400
  },
  {
    id: 108,
    title: "Customer Segmentation",
    description: "Group customers by behavior and value for targeted strategies.",
    difficulty: 4,
    difficultyLabel: "Advanced",
    category: "Clustering",
    objective: "Master segmentation analysis",
    skill: "Customer analytics",
    problem: "Segment customers to personalize marketing campaigns",
    setup: "Your marketing team needs actionable customer segments.",
    excelFile: {
      name: "Customer_Database.xlsx",
      sheets: [{
        name: "Customers",
        columns: ["Customer_ID", "Age_Group", "Annual_Spend", "Purchase_Frequency", "Last_Purchase_Days", "Channel_Preference", "Loyalty_Score"],
        rows: 500,
        sampleData: [
          { Customer_ID: "C1001", Age_Group: "25-34", Annual_Spend: 2450, Purchase_Frequency: 12, Last_Purchase_Days: 15, Channel_Preference: "Online", Loyalty_Score: 8 },
          { Customer_ID: "C1002", Age_Group: "45-54", Annual_Spend: 890, Purchase_Frequency: 3, Last_Purchase_Days: 120, Channel_Preference: "Store", Loyalty_Score: 4 },
          { Customer_ID: "C1003", Age_Group: "35-44", Annual_Spend: 4200, Purchase_Frequency: 24, Last_Purchase_Days: 7, Channel_Preference: "Both", Loyalty_Score: 10 },
          { Customer_ID: "C1004", Age_Group: "55-64", Annual_Spend: 340, Purchase_Frequency: 2, Last_Purchase_Days: 200, Channel_Preference: "Phone", Loyalty_Score: 3 }
        ]
      }]
    },
    phases: {
      setup: { title: "Briefing", description: "Segments enable personalization at scale.", tips: ["Choose right variables", "Avoid over-segmenting", "Make actionable"] },
      upload: { title: "Upload", description: "Upload customer dataset.", tips: ["Profile the data", "Identify key metrics"] },
      analysis: { title: "Segment", description: "Create customer groups.", tips: ["RFM analysis", "K-means clustering", "Value tiers"] },
      insights: { title: "Strategize", description: "Develop segment strategies.", tips: ["Segment profiles", "Targeting recommendations"] }
    },
    aiPartner: { name: "Segment Sage", personality: "strategic", description: "Customer insights expert" },
    skillBadge: { name: "Segment Master", description: "Expert at customer grouping", icon: "Users" },
    estimatedTime: "35-45 min",
    xpReward: 450
  },
  {
    id: 109,
    title: "Research Synthesis",
    description: "Combine findings from multiple sources into coherent insights.",
    difficulty: 5,
    difficultyLabel: "Expert",
    category: "Research",
    objective: "Master research synthesis",
    skill: "Information synthesis",
    problem: "Synthesize market research from 5 reports into strategic recommendations",
    setup: "Leadership needs a unified view of market trends from scattered research.",
    excelFile: {
      name: "Research_Collection.xlsx",
      sheets: [
        {
          name: "Report_1_Industry",
          columns: ["Finding_ID", "Source", "Key_Finding", "Confidence_Level", "Sample_Size", "Date"],
          rows: 25,
          sampleData: [
            { Finding_ID: 1, Source: "Gartner", Key_Finding: "AI adoption up 45% YoY", Confidence_Level: "High", Sample_Size: 500, Date: "2024-01" },
            { Finding_ID: 2, Source: "McKinsey", Key_Finding: "Cost barriers dropping", Confidence_Level: "Medium", Sample_Size: 200, Date: "2024-02" }
          ]
        },
        {
          name: "Report_2_Consumer",
          columns: ["Finding_ID", "Source", "Key_Finding", "Confidence_Level", "Sample_Size", "Date"],
          rows: 20,
          sampleData: [
            { Finding_ID: 1, Source: "Nielsen", Key_Finding: "Price sensitivity increasing", Confidence_Level: "High", Sample_Size: 2000, Date: "2024-01" },
            { Finding_ID: 2, Source: "Deloitte", Key_Finding: "Sustainability matters to 68%", Confidence_Level: "High", Sample_Size: 1500, Date: "2024-02" }
          ]
        }
      ]
    },
    phases: {
      setup: { title: "Briefing", description: "Synthesis creates clarity from chaos.", tips: ["Identify themes", "Assess quality", "Resolve conflicts"] },
      upload: { title: "Upload", description: "Upload research spreadsheets.", tips: ["Catalog sources", "Note methodologies"] },
      analysis: { title: "Synthesize", description: "Find patterns across sources.", tips: ["Theme extraction", "Agreement analysis", "Gap identification"] },
      insights: { title: "Report", description: "Create strategic summary.", tips: ["Executive summary", "Confidence ratings", "Action items"] }
    },
    aiPartner: { name: "Synthesis Master", personality: "wise", description: "Research integration expert" },
    skillBadge: { name: "Research Synthesizer", description: "Master of insight integration", icon: "BookOpen" },
    estimatedTime: "40-50 min",
    xpReward: 500
  },
  {
    id: 110,
    title: "Executive Dashboard",
    description: "Build a comprehensive dashboard for C-suite decision making.",
    difficulty: 5,
    difficultyLabel: "Expert",
    category: "Visualization",
    objective: "Master executive reporting",
    skill: "Data visualization",
    problem: "Create a monthly dashboard for the CEO with key business metrics",
    setup: "The board needs a clear view of company performance in one place.",
    excelFile: {
      name: "Executive_Data.xlsx",
      sheets: [
        {
          name: "Financials",
          columns: ["Month", "Revenue_K", "COGS_K", "Gross_Profit_K", "OpEx_K", "Net_Income_K", "Cash_Flow_K"],
          rows: 12,
          sampleData: [
            { Month: "Jan", Revenue_K: 2450, COGS_K: 1225, Gross_Profit_K: 1225, OpEx_K: 980, Net_Income_K: 245, Cash_Flow_K: 320 },
            { Month: "Feb", Revenue_K: 2680, COGS_K: 1340, Gross_Profit_K: 1340, OpEx_K: 1020, Net_Income_K: 320, Cash_Flow_K: 380 }
          ]
        },
        {
          name: "Operations",
          columns: ["Month", "Customer_Count", "Churn_Rate", "NPS_Score", "Employee_Count", "CSAT_Score"],
          rows: 12,
          sampleData: [
            { Month: "Jan", Customer_Count: 12500, Churn_Rate: 2.1, NPS_Score: 42, Employee_Count: 245, CSAT_Score: 4.2 },
            { Month: "Feb", Customer_Count: 12800, Churn_Rate: 1.9, NPS_Score: 45, Employee_Count: 252, CSAT_Score: 4.3 }
          ]
        }
      ]
    },
    phases: {
      setup: { title: "Briefing", description: "Dashboards tell stories with data.", tips: ["Know your audience", "Focus on decisions", "Keep it simple"] },
      upload: { title: "Upload", description: "Upload all data sources.", tips: ["Financial data", "Operational metrics", "External data"] },
      analysis: { title: "Design", description: "Create dashboard layout.", tips: ["KPI selection", "Visual hierarchy", "Drill-down paths"] },
      insights: { title: "Present", description: "Prepare executive presentation.", tips: ["Narrative flow", "Context and benchmarks", "Recommendations"] }
    },
    aiPartner: { name: "Dashboard Architect", personality: "executive", description: "C-suite reporting specialist" },
    skillBadge: { name: "Dashboard Master", description: "Expert at executive visualization", icon: "LayoutDashboard" },
    estimatedTime: "45-60 min",
    xpReward: 500
  }
];

export const getDataAnalysisMissionById = (id: number) => dataAnalysisMissions.find(m => m.id === id);
export const getAllDataAnalysisMissions = () => dataAnalysisMissions;
