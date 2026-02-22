let jobs = JSON.parse(localStorage.getItem('jobs'));

if (!jobs || jobs.length === 0) {
    jobs = [
        {
        id: 1,
        company: "Mobile First Corp",
        position: "React Native Developer",
        type: "Remote • Full-time • $130,000 - $175,000",
        status: "Not Applied",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide."
        },

        {
        id: 2,
        company: "Tech Innovations Inc",
        position: "Senior Frontend Developer",
        type: "Remote • Full-time • $120,000 - $160,000",
        status: "Not Applied",
        description: "Lead frontend development for enterprise applications using React and TypeScript."
        },
        
        {
        id: 3,
        company: "Cloud Solutions Ltd",
        position: "Full Stack Developer",
        type: "Hybrid • Full-time • $140,000 - $180,000",
        status: "Not Applied",
        description: "Build scalable cloud applications using Node.js and React."
        },

        {
        id: 4,
        company: "DataDrive Analytics",
        position: "UI/UX Designer",
        type: "Remote • Full-time • $90,000 - $120,000",
        status: "Not Applied",
        description: "Design beautiful and intuitive interfaces for data visualization platforms."
        },

        {
        id: 5,
        company: "Mobile First Corp",
        position: "iOS Developer",
        type: "Remote • Full-time • $130,000 - $170,000",
        status: "Not Applied",
        description: "Build native iOS applications using Swift and SwiftUI."
        },
    
        {
        id: 6,
        company: "AI Startup",
        position: "Machine Learning Engineer",
        type: "Remote • Full-time • $150,000 - $200,000",
        status: "Not Applied",
        description: "Develop and deploy machine learning models for production applications."
        },
    
        {
            id: 7,
            company: "E-commerce Giant",
            position: "DevOps Engineer",
            type: "Remote • Full-time • $130,000 - $165,000",
            status: "Not Applied",
            description: "Manage cloud infrastructure and CI/CD pipelines for large-scale applications."
        },
        {
        id: 8,
        company: "FinTech Solutions",
        position: "Backend Developer",
        type: "Remote • Full-time • $125,000 - $155,000",
        status: "Not Applied",
        description: "Build robust backend services using Python and Django."
        }
    ];

localStorage.setItem('jobs', JSON.stringify(jobs));
}

function saveJobs() {
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

function updateCounts() {
    const totalJobs = jobs.length;
    const interviewJobs = jobs.filter(job => job.status === 'Interview').length;
    const rejectedJobs = jobs.filter(job => job.status === 'Rejected').length;
    
    document.getElementById('total-count').textContent = totalJobs;
    document.getElementById('interview-count').textContent = interviewJobs;
    document.getElementById('rejected-count').textContent = rejectedJobs;
    document.getElementById('total-jobs-count').textContent = `${totalJobs} jobs`;
}

function getStatusBorderClass(status) {
    if (status === 'Interview') return 'status-border-interview';
    if (status === 'Rejected') return 'status-border-rejected';
    return '';
}

function getStatusButtonClass(status) {
    if (status === 'Interview') return 'bg-green-100 text-green-700';
    if (status === 'Rejected') return 'bg-red-100 text-red-700';
    return 'bg-[#EEF4FF]';
}

function displayJobs() {
    const container = document.getElementById('jobs-container');
    
    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center space-y-4 text-center rounded-xl shadow bg-[#FFFFFF] h-[350px] mb-[60px]">
                <div>
                    <img src="./jobs.png" alt="No jobs">
                </div>
                <div>
                    <h2 class="font-semibold text-[24px]">No jobs available</h2>
                    <p class="font-regular text-[16px] text-[#64748B]">Check back soon for new job opportunities</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = jobs.map(job => {
        const borderClass = getStatusBorderClass(job.status);
        const statusButtonClass = getStatusButtonClass(job.status);
        
        return `
            <div class="bg-[#FFFFFF] p-4 space-y-4 rounded-xl shadow mb-[14px] ${borderClass}" data-job-id="${job.id}">
                <div class="flex justify-between items-center">
                    <h2 class="font-semibold text-[18px]">${job.company}</h2>
                    <div class="bg-[#FFFFFF] p-2 rounded-full shadow mb-[14px] delete-btn cursor-pointer" data-id="${job.id}">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
                <p class="font-regular text-[16px] text-[#64748B]">${job.position}</p>
                <p class="font-regular text-[14px] text-[#64748B]">${job.type}</p>
                <button class="${statusButtonClass} font-medium text-[14px] px-4 py-2 rounded">${job.status}</button>
                <p class="font-regular text-[14px] text-[#64748B]">${job.description}</p>
                <div>
                    <button class="btn btn-outline btn-success hover:text-white hover:bg-green-500 interview-btn" data-id="${job.id}">interview</button>
                    <button class="btn btn-outline btn-error hover:text-white hover:bg-red-500 rejected-btn" data-id="${job.id}">rejected</button>
                </div>
            </div>
    `}).join('');
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            deleteJob(id);
        });
    });
    
    document.querySelectorAll('.interview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            updateJobStatus(id, 'Interview');
        });
    });
    
    document.querySelectorAll('.rejected-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            updateJobStatus(id, 'Rejected');
        });
    });
}

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    saveJobs();
    updateCounts();
    displayJobs();
}

function updateJobStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(job => job.id === id);
    if (jobIndex !== -1) {
        if (jobs[jobIndex].status === newStatus) {
            return;
        }
        jobs[jobIndex].status = newStatus;
        saveJobs();
        updateCounts();
        displayJobs();
    }
}

 


document.addEventListener('DOMContentLoaded', () => {
    updateCounts();
    displayJobs();
});