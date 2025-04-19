function showInlineMessage(id, msg, isSuccess) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.style.display = 'block';
    el.classList.toggle('text-success', isSuccess);
    el.classList.toggle('text-danger', !isSuccess);
}

async function handleSubmission(formId, messageId) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', async e => {
        e.preventDefault();

        const msgEl = document.getElementById(messageId);
        msgEl.style.display = 'none';
        msgEl.textContent = '';

        const data = new FormData(form);

        try {
            const res = await fetch('login.php', { method: 'POST', body: data });
            const json = await res.json();

            showInlineMessage(messageId, json.message, json.status === 'success');

            if (json.status === 'success' && formId === 'loginForm') {
                setTimeout(() => window.location.reload(), 800);
            }

            if (formId === 'registerForm' && json.status === 'success') {
                form.reset();
            }
        } catch (err) {
            showInlineMessage(messageId, 'Server error, try again.', false);
            console.error(err);
        }
    });
}

handleSubmission('loginForm', 'loginMessage');
handleSubmission('registerForm', 'registerMessage');