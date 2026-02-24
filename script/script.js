let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const jobsCount = document.getElementById('jobsCount');

// All button here ....

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');


// Update job count functions ....

function updateJobCounts() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  if (currentStatus === 'all-filter-btn') {
    jobsCount.innerText = allCardSection.children.length + " Jobs";
  } else if (currentStatus === 'interview-filter-btn') {
    jobsCount.innerText = interviewList.length + " Jobs";
  } else {
    jobsCount.innerText = rejectedList.length + " Jobs";
  }
}

updateJobCounts();


//  Toogle function here ........


function toggleStyle(id) {

  allFilterBtn.classList.remove('bg-black','text-white');
  interviewFilterBtn.classList.remove('bg-black','text-white');
  rejectedFilterBtn.classList.remove('bg-black','text-white');

  allFilterBtn.classList.add('bg-gray-300');
  interviewFilterBtn.classList.add('bg-gray-300');
  rejectedFilterBtn.classList.add('bg-gray-300');

  const selected = document.getElementById(id);
  selected.classList.remove('bg-gray-300');
  selected.classList.add('bg-black','text-white');

  currentStatus = id;

  if (id === 'all-filter-btn') {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  } 
  else if (id === 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterviewJobs();
  } 
  else {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejectedJobs();

  }

  updateJobCounts();

}


 

mainContainer.addEventListener('click', handleMainClick);

function handleMainClick(event) {

  if (event.target.classList.contains('interview-btn')) {
    markAsInterview(event);

  }

  if (event.target.classList.contains('rejected-btn')) {
    markAsRejected(event);

  }

  if (event.target.closest('.btn-delete')) {
    deleteJobCard(event);

  }

}



function markAsInterview(event) {
  const card = event.target.closest('.card');
  const companyName = card.querySelector('.plantName').innerText;
  const statusElement = card.querySelector('.status');

  statusElement.innerText = 'Interview';
  statusElement.className = "status bg-green-200 px-3 py-1 rounded inline-block";

  const jobInfo = {
    companyName,
    html: card.outerHTML
  };

  if (!interviewList.find(item => item.companyName === companyName)) {
    interviewList.push(jobInfo);
  }

  rejectedList = rejectedList.filter(item => item.companyName !== companyName);

  if (currentStatus === 'rejected-filter-btn') {
    renderRejectedJobs();
  }

  updateJobCounts();
}



function markAsRejected(event) {
  const card = event.target.closest('.card');
  const companyName = card.querySelector('.plantName').innerText;
  const statusElement = card.querySelector('.status');

  statusElement.innerText = 'Rejected';
  statusElement.className = "status bg-red-200 px-3 py-2 rounded inline-block";

  const jobInfo = {
    companyName,
    html: card.outerHTML

  };

  if (!rejectedList.find(item => item.companyName === companyName)) {
    rejectedList.push(jobInfo);

  }

  interviewList = interviewList.filter(item => item.companyName !== companyName);

  if (currentStatus === 'interview-filter-btn') {
    renderInterviewJobs();

  }

  updateJobCounts();
}


// delete handle functions here.........

function deleteJobCard(event) {
  const card = event.target.closest('.card');
  const companyName = card.querySelector('.plantName').innerText;

  card.remove();

  interviewList = interviewList.filter(item => item.companyName !== companyName);
  rejectedList = rejectedList.filter(item => item.companyName !== companyName);

  if (currentStatus === 'interview-filter-btn') renderInterviewJobs();
  if (currentStatus === 'rejected-filter-btn') renderRejectedJobs();

  updateJobCounts();
}


// Render Intervide functions here .......

function renderInterviewJobs() {
  filterSection.innerHTML = '';

  if (interviewList.length === 0) {
    filterSection.innerHTML = `
      <div class="text-center border border-indigo-300 rounded p-22 my-10">
        <div class="flex flex-col items-center justify-center">
          <img src="jobs.png" alt="">
        </div>
        <p class="text-xl font-semibold">No Jobs Available</p>
        <p class="text-gray-500">There are no jobs in Interview tab.</p>
      </div>
    `;
    return;
  }

  interviewList.forEach(job => {
    filterSection.innerHTML += job.html;
  });
}


// Render Reject functin here ...........

function renderRejectedJobs() {
  filterSection.innerHTML = '';

  if (rejectedList.length === 0) {
    filterSection.innerHTML = `
      <div class="text-center border border-indigo-300 rounded p-22 my-10">
        <div class="flex flex-col items-center justify-center">
          <img src="jobs.png" alt="">
        </div>
        <p class="text-xl font-semibold">No Jobs Available</p>
        <p class="text-gray-500">There are no jobs in Rejected tab.</p>
      </div>
    `;
    return;
  }

  rejectedList.forEach(job => {
    filterSection.innerHTML += job.html;
  });
}