// Select all tabs and content
const tabs = document.querySelectorAll('.tabs div');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and content
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.querySelector(`#content${tab.id.slice(-1)}`).classList.add('active');
    });
});