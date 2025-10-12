// app-logic.js
// هذا الملف يحتوي على منطق لوحة القيادة (KPIs, rendering, showDetail)
// يجب استبدال هذا المتغير (observationsData) بالقراءة من قاعدة بيانات Firestore لاحقاً

// ----------------------------------------------------------------------
// 1. البيانات الثابتة (لغرض العرض)
// ----------------------------------------------------------------------

const observationsData = [ 
    // بيانات تجريبية بسيطة للتأكد من ربط Firebase يعمل
    {
        id: 'obs1',
        type: 'جودة',
        status: 'جديد',
        department: 'QUALITY ASSURANCE',
        description: 'ملاحظة تجريبية: وجود تسرب بسيط بالقرب من محطة المراقبة رقم 3.',
        priority: 'عالي',
        isComparative: true,
        createdAt: new Date('2025-05-10T10:00:00').getTime(),
        closedAt: null,
        attachments: [
            { type: 'image', url: './65651.png' },
        ],
        closeoutAttachments: [
            { type: 'image', url: './66666.png' },
        ],
        aiInsightResult: 'ملخص: هذه الملاحظة تحتاج لمعالجة فورية وتوثيق بالصورة بعد الإغلاق.'
    },
    {
        id: 'obs2',
        type: 'صيانة',
        status: 'تمت المعالجة',
        department: 'MAINTENANCE',
        description: 'مشكلة في إضاءة الممر الرئيسي تم إصلاحها وتوثيقها.',
        priority: 'متوسط',
        isComparative: false,
        createdAt: new Date('2025-05-08T15:30:00').getTime(),
        closedAt: new Date('2025-05-09T10:00:00').getTime(),
        attachments: [
            { type: 'image', url: './65651.png' },
        ],
        closeoutAttachments: [
            { type: 'image', url: './66666.png' },
        ],
        aiInsightResult: 'تم تحليل البيانات وتأكيد الإغلاق الفعال. معدل الاستجابة ممتاز.'
    },
    // ملاحظة إضافية للسلامة
    {
        id: 'obs3',
        type: 'سلامة',
        status: 'قيد التنفيذ',
        department: 'HSE',
        description: 'اكتشاف ثغرة أمنية في السور الخارجي للموقع A.',
        priority: 'عالي',
        isComparative: false,
        createdAt: new Date('2025-05-11T09:00:00').getTime(),
        closedAt: null,
        attachments: [
            { type: 'image', url: './65651.png' },
        ],
        closeoutAttachments: [],
        aiInsightResult: 'تتطلب هذه الملاحظة إجراءً فورياً. تم تصنيفها كخطر أمني عاجل.'
    },
    // ملاحظة إضافية للبيئة
    {
        id: 'obs4',
        type: 'بيئة',
        status: 'جديد',
        department: 'ENVIRONMENTAL',
        description: 'ملاحظة حول زيادة الضوضاء في منطقة التخزين الخارجية B.',
        priority: 'متوسط',
        isComparative: false,
        createdAt: new Date('2025-05-12T08:00:00').getTime(),
        closedAt: null,
        attachments: [
            { type: 'image', url: './65651.png' },
        ],
        closeoutAttachments: [],
        aiInsightResult: 'تحليل الضوضاء يشير إلى تجاوز الحدود المسموح بها. يجب فحص المعدات.'
    }
];

let currentSelectedObservation = null;

// ----------------------------------------------------------------------
// 2. حساب مؤشرات الأداء (KPIs)
// ----------------------------------------------------------------------

function calculateKPIs() {
    const totalReports = observationsData.length;
    const openReports = observationsData.filter(obs => obs.status !== 'تمت المعالجة').length;
    const closedReports = totalReports - openReports;
    const closurePercentage = totalReports > 0 ? Math.round((closedReports / totalReports) * 100) : 0;

    return { totalReports, openReports, closedReports, closurePercentage };
}

// ----------------------------------------------------------------------
// 3. عرض مؤشرات الأداء (Rendering)
// ----------------------------------------------------------------------

function renderKPIs() {
    const kpis = calculateKPIs();

    document.getElementById('totalReports').textContent = kpis.totalReports;
    document.getElementById('openReports').textContent = kpis.openReports;
    document.getElementById('closedReports').textContent = kpis.closedReports;
    document.getElementById('closurePercentage').textContent = `${kpis.closurePercentage}%`;
    
    // عرض ملخص تنفيذي (AI Insight)
    renderExecutiveSummary(kpis);
}

function renderExecutiveSummary(kpis) {
    let insightText;
    if (kpis.openReports > 1) {
        insightText = `تظهر البيانات أن هناك ${kpis.openReports} ملاحظات مفتوحة، مع وجود تركيز حالي على ملاحظات الجودة والسلامة. يجب على الفريق التنفيذي مراجعة خطط العمل الفورية لتقليل متوسط زمن الإغلاق والتركيز على توثيق جميع الملاحظات بالصور لضمان جودة الإغلاق.`;
    } else if (kpis.closurePercentage === 100) {
        insightText = `تهانينا! معدل الإغلاق الكلي يبلغ 100%. أداء فرق الجودة والصيانة ممتاز. يجب الاستمرار في المراقبة لضمان الحفاظ على هذا المستوى.`;
    } else {
        insightText = `النظام يعمل بكفاءة، مع وجود ملاحظة مفتوحة واحدة فقط. معدل الإغلاق جيد جداً عند ${kpis.closurePercentage}%.`;
    }

    document.getElementById('kpiInsightResult').innerHTML = `
        <div class="kpi-insight-container p-6 bg-white rounded-3xl shadow-lg" style="border-top: 5px solid var(--color-navy);">
            <h3 class="text-2xl font-bold mb-3" style="color: var(--color-navy);">ملخص تحليلي تنفيذي (AI Insight)</h3>
            <p class="text-gray-700 leading-relaxed">${insightText}</p>
        </div>
    `;
}

// ----------------------------------------------------------------------
// 4. عرض قائمة الملاحظات (Rendering List)
// ----------------------------------------------------------------------

function renderObservationsList(data) {
    const listContainer = document.getElementById('observationsList');
    listContainer.innerHTML = ''; // إفراغ القائمة قبل العرض

    if (data.length === 0) {
        listContainer.innerHTML = '<div class="text-center text-gray-500 mt-10">لا توجد ملاحظات لعرضها.</div>';
        return;
    }

    data.forEach(obs => {
        let statusClass;
        if (obs.status === 'جديد') {
            statusClass = 'bg-red-500';
        } else if (obs.status === 'قيد التنفيذ') {
            statusClass = 'bg-yellow-500';
        } else {
            statusClass = 'bg-green-600';
        }

        const itemHtml = `
            <div id="obs-${obs.id}" class="observation-item p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-200 cursor-pointer" onclick="showObservationDetail('${obs.id}')">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-bold" style="color: var(--color-navy);">${obs.department}</span>
                    <span class="text-xs font-semibold text-white px-2 py-0.5 rounded-full ${statusClass}">${obs.status}</span>
                </div>
                <p class="text-sm text-gray-700">${obs.description.substring(0, 50)}...</p>
            </div>
        `;
        listContainer.innerHTML += itemHtml;
    });

    // إضافة الفئة النشطة للملاحظة المحددة حاليًا
    if (currentSelectedObservation) {
        const activeElement = document.getElementById(`obs-${currentSelectedObservation.id}`);
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }
}

// ----------------------------------------------------------------------
// 5. عرض التفاصيل (Show Detail)
// ----------------------------------------------------------------------

function showObservationDetail(id) {
    const obs = observationsData.find(o => o.id === id);
    if (!obs) return;

    // إزالة الفئة النشطة من العنصر السابق
    if (currentSelectedObservation) {
        const prevActive = document.getElementById(`obs-${currentSelectedObservation.id}`);
        if (prevActive) {
            prevActive.classList.remove('active');
        }
    }
    
    currentSelectedObservation = obs;

    // إضافة الفئة النشطة للعنصر الجديد
    const newActive = document.getElementById(`obs-${currentSelectedObservation.id}`);
    if (newActive) {
        newActive.classList.add('active');
    }

    let statusColor, buttonHtml = '';
    if (obs.status === 'جديد') {
        statusColor = 'text-red-600';
        buttonHtml = `<button onclick="openModal('closeoutModal')" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 mt-4">إغلاق وتوثيق الملاحظة</button>`;
    } else if (obs.status === 'قيد التنفيذ') {
        statusColor = 'text-yellow-600';
        buttonHtml = `<button onclick="openModal('closeoutModal')" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-200 mt-4">إغلاق وتوثيق الملاحظة</button>`;
    } else {
        statusColor = 'text-green-600';
    }

    // بناء عرض الصور
    let imagesHtml = '';
    if (obs.isComparative) {
        // حالة مقارنة الصور (قبل وبعد)
        imagesHtml = `
            <div class="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold text-gray-600 mb-2">قبل المعالجة</h4>
                    <img src="${obs.attachments[0].url}" alt="Before Fix" class="w-full h-auto rounded-lg shadow-md">
                </div>
                <div>
                    <h4 class="font-semibold text-gray-600 mb-2">بعد المعالجة (التوثيق)</h4>
                    <img src="${obs.closeoutAttachments[0].url}" alt="After Fix" class="w-full h-auto rounded-lg shadow-md">
                </div>
            </div>
        `;
    } else if (obs.attachments.length > 0) {
        // حالة صورة واحدة
        imagesHtml = `
            <div class="mt-4">
                <h4 class="font-semibold text-gray-600 mb-2">صور الملاحظة</h4>
                <img src="${obs.attachments[0].url}" alt="Observation Image" class="w-full h-auto rounded-lg shadow-md max-w-sm">
            </div>
        `;
    }

    // بناء محتوى التحليل الذكي (AI)
    const aiHtml = obs.aiInsightResult ? `
        <div class="mt-6 p-4 rounded-xl" style="background-color: var(--color-light-teal);">
            <h4 class="font-bold mb-2 flex items-center" style="color: var(--color-navy);"><i data-lucide="brain" class="w-5 h-5 ml-2"></i>ملخص تحليلي (AI Insight):</h4>
            <p class="text-sm">${obs.aiInsightResult}</p>
        </div>
    ` : '';


    const detailHtml = `
        <div class="space-y-4">
            <div class="flex justify-between items-start border-b pb-3">
                <div>
                    <span class="text-sm font-semibold text-gray-500">${new Date(obs.createdAt).toLocaleDateString('ar-SA')}</span>
                    <h3 class="text-3xl font-bold mt-1" style="color: var(--color-navy);">${obs.department}</h3>
                </div>
                <div class="text-right">
                    <span class="text-lg font-bold ${statusColor}">الحالة: ${obs.status}</span>
                    <span class="block text-sm text-gray-600">الأولوية: ${obs.priority}</span>
                </div>
            </div>
            
            <p class="text-xl leading-relaxed text-gray-800">${obs.description}</p>

            ${imagesHtml}
            ${aiHtml}
            ${buttonHtml}
        </div>
    `;

    document.getElementById('observationDetailContent').innerHTML = detailHtml;
    
    // إعادة إنشاء أيقونات Lucide بعد تحديث محتوى الـ HTML
    if (typeof lucide !== 'undefined') lucide.createIcons();
}


// ----------------------------------------------------------------------
// 6. وظيفة التهيئة الرئيسية
// ----------------------------------------------------------------------

// دالة تجميع كل الوظائف
function calculateAndRenderAll() {
    // فرز البيانات الأحدث أولاً
    observationsData.sort((a, b) => b.createdAt - a.createdAt);
    
    renderKPIs();
    renderObservationsList(observationsData);

    if (observationsData.length > 0) {
         // عرض أول ملاحظة عند التحميل لتظهر التفاصيل
         showObservationDetail(observationsData[0].id);
    }
}


// دالة التهيئة العامة (يتم استدعاؤها من auth-manager.js)
function initApp() {
    // هذه الوظيفة تبدأ عمل التطبيق بعد تسجيل الدخول
    calculateAndRenderAll();
    
    // تفعيل أيقونات Lucide (يتم تفعيلها أيضًا في showObservationDetail)
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ----------------------------------------------------------------------
// 7. ربط الفلاتر (Handle Filter Change)
// ----------------------------------------------------------------------

function handleFilterChange() {
    const filterValue = document.getElementById('observationFilter').value;
    let filteredData;

    if (filterValue === 'الكل') {
        filteredData = observationsData;
    } else if (['جديد', 'قيد التنفيذ', 'تمت المعالجة'].includes(filterValue)) {
        filteredData = observationsData.filter(obs => obs.status === filterValue);
    } else {
        filteredData = observationsData.filter(obs => obs.type === filterValue);
    }
    renderObservationsList(filteredData);

    if (filteredData.length > 0) {
        showObservationDetail(filteredData[0].id);
    } else {
        document.getElementById('observationDetailContent').innerHTML = '<div class="text-center text-gray-500 mt-20">اختر ملاحظة من القائمة لعرض التفاصيل.</div>';
        document.getElementById('observationsList').innerHTML = '<div class="text-center text-gray-500 mt-10">لا توجد ملاحظات مطابقة.</div>';
        currentSelectedObservation = null; // لا توجد ملاحظة محددة
    }
}
