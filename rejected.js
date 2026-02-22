let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

function updateCounts() {
    const totalJobs = jobs.length;
    const interviewJobs = jobs.filter(job => job.status === 'Interview').length;
    const rejectedJobs = jobs.filter(job => job.status === 'Rejected').length;
    
    document.getElementById('total-count').textContent = totalJobs;
    document.getElementById('interview-count').textContent = interviewJobs;
    document.getElementById('rejected-count').textContent = rejectedJobs;
    
    document.getElementById('rejected-jobs-count').textContent = `${rejectedJobs} of ${totalJobs} jobs`;
}

function displayJobs() {
    const container = document.getElementById('jobs-container');
    const rejectedJobs = jobs.filter(job => job.status === 'Rejected');
    const totalJobs = jobs.length;
    
    document.getElementById('rejected-jobs-count').textContent = `${rejectedJobs.length} of ${totalJobs} jobs`;
    
    if (rejectedJobs.length === 0) {
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
    
    container.innerHTML = rejectedJobs.map(job => `
        <div class="bg-[#FFFFFF] p-4 space-y-4 rounded-xl shadow mb-[14px]" data-job-id="${job.id}">
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-[18px]">${job.company}</h2>
                <div class="bg-[#FFFFFF] p-2 rounded-full shadow mb-[14px] delete-btn cursor-pointer" data-id="${job.id}">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
            <p class="font-regular text-[16px] text-[#64748B]">${job.position}</p>
            <p class="font-regular text-[14px] text-[#64748B]">${job.type}</p>
            <button class="bg-red-100 text-red-700 font-medium text-[14px] px-4 py-2 rounded">${job.status}</button>
            <p class="font-regular text-[14px] text-[#64748B]">${job.description}</p>
            <div>
                <button class="btn btn-outline btn-success hover:text-white hover:bg-green-500 interview-btn" data-id="${job.id}">interview</button>
                <button class="btn btn-error text-white bg-red-500 rejected-btn" data-id="${job.id}">rejected</button>
            </div>
        </div>
    `).join('');
    
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
            moveToAllJobs(id);
        });
    });
}

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    updateCounts();
    displayJobs();
}

function moveToAllJobs(id) {
    const jobIndex = jobs.findIndex(job => job.id === id);
    if (jobIndex !== -1) {
        jobs[jobIndex].status = 'Not Applied';
        localStorage.setItem('jobs', JSON.stringify(jobs));
        updateCounts();
        displayJobs();
    }
}

function updateJobStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(job => job.id === id);
    if (jobIndex !== -1) {
        jobs[jobIndex].status = newStatus;
        localStorage.setItem('jobs', JSON.stringify(jobs));
        updateCounts();
        displayJobs();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCounts();
    displayJobs();
});