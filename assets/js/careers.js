document.addEventListener('DOMContentLoaded', () => {
    let jobs;
    let jobLinks;
    let locations = [];
    let jobsList;
    let locationsSelect = document.querySelector('select#location');
    let wrapper = document.querySelector('.openings-wrapper');
    let preFilterState = null;
    if (wrapper) {
        preFilterState = wrapper.dataset.state ? wrapper.dataset.state : null;
    }

    let jobGetter = setInterval(() => {
        jobs = document.querySelectorAll('.resumator-job');
        jobLinks = document.querySelectorAll('.resumator-job-link');
        jobsList = document.querySelector('#resumator-jobs');

        if (jobs.length > 0) {
            clearInterval(jobGetter);
            restructureJobs();
            getLocations();
            filtersListener();
        }
    }, 50)

    function restructureJobs() {
        jobs.forEach(job => {
            let jobLink = job.querySelector('a.resumator-job-link');
            if (jobLink) {
                let location = job.querySelector('.resumator-job-info').innerText;
                let state = location.split(', ')[1];

                if (preFilterState && state == preFilterState) {
                    jobLink.innerText = '';
                    jobLink.setAttribute('data-location', location);
                    job.parentNode.append(jobLink);
                    jobLink.append(job);
                } else {
                    job.remove();
                }
            }
        })

        if (wrapper.querySelector('.resumator-job-link') == null) {
            wrapper.querySelector('.no-openings').innerText = "We currently don't have any open positions. Check back later!";
        }
    }

    function getLocations() {
        jobs.forEach(job => {
            let location = job.querySelector('.resumator-job-info').innerText;
            let state = location.split(', ')[1];

            if (preFilterState && state == preFilterState) {
                if (!locations.includes(location)) {
                    locations.push(location);
                    let option = document.createElement('option');
                    option.innerText = location;
                    option.setAttribute('value', location);
                    locationsSelect.append(option);
                }
            }
        })
    }

    function filtersListener() {
        locationsSelect.addEventListener('change', () => {
            let locVal = locationsSelect.value;
            if (locVal == 'all') {
                jobLinks.forEach(job => {
                    job.classList.remove('inactive');
                })
            } else {
                jobLinks.forEach(job => {
                    if (job.getAttribute('data-location') == locVal) {
                        job.classList.remove('inactive');
                    } else {
                        job.classList.add('inactive');
                    }
                })
            }
        })
    }
})