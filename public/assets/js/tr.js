document.addEventListener("DOMContentLoaded", function() {
    function tcno_dogrula(tcno) {
        tcno = String(tcno);
        if (tcno.substring(0, 1) === '0') {
            return false;
        }
        if (tcno.length !== 11) {
            return false;
        }
        var ilkon_array = tcno.substr(0, 10).split('');
        var ilkon_total = hane_tek = hane_cift = 0;
        for (var i = j = 0; i < 9; ++i) {
            j = parseInt(ilkon_array[i], 10);
            if (i & 1) {
                hane_cift += j;
            } else {
                hane_tek += j;
            }
            ilkon_total += j;
        }
        if ((hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) {
            return false;
        }
        ilkon_total += parseInt(ilkon_array[9], 10);
        if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
            return false;
        }
        return true;
    }

    function validateForm() {
        const tcno = document.getElementById('tridField').value;
        const tckError = document.getElementById('tck_error');

        if (!tcno_dogrula(tcno)) {
            tckError.style.display = 'block';
            return false;
        } else {
            tckError.style.display = 'none';
        }

        return true;
    }

    function limitInputLength(event) {
        const input = event.target;
        if (input.value.length > 11) {
            input.value = input.value.slice(0, 11);
        }
    }

    document.getElementById('loginForm').onsubmit = validateForm;
    document.getElementById('tridField').oninput = limitInputLength;
});