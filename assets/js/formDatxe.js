document.addEventListener('DOMContentLoaded', function() {
    // Lấy reference tới form
    var form = document.querySelector('form');

    // Ngăn chặn gửi form trực tiếp
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        // Kiểm tra không được bỏ trống các trường input
        var inputs = form.querySelectorAll('input, select');
        var isValid = true;
        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });

        if (!isValid) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Kiểm tra ngày đặt xe phải bằng hoặc sau ngày hiện tại
        var currentDate = new Date().toISOString().split('T')[0];
        var selectedDate = document.getElementById('form-date').value;
        if (selectedDate < currentDate) {
            alert('Ngày đặt xe phải là ngày hiện tại hoặc sau ngày hiện tại.');
            return;
        }

        // Kiểm tra số điện thoại phải là 10 số, đúng chuẩn số điện thoại Việt Nam
        var phoneNumber = document.getElementById('form-tel').value;
        if (!validatePhoneNumber(phoneNumber)) {
            alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại có 10 chữ số.');
            return;
        }

        // Lấy dữ liệu từ form
        var formData = new FormData(form);

        // Chuyển đổi formData thành đối tượng JSON
        var jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });

        // Gửi yêu cầu POST tới API sử dụng fetch
        fetch('https://6605116c2ca9478ea17f2d5d.mockapi.io/sendNail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi gửi dữ liệu tới API.');
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Dữ liệu đã được gửi thành công:', data);
            // Hiển thị thông báo thành công và tắt dialog
            alert('Thông tin đã được gửi thành công!');
            var modal = document.getElementById('exampleModal');
            var bootstrapModal = bootstrap.Modal.getInstance(modal);
            bootstrapModal.hide();
        })
        .catch(function(error) {
            console.error('Lỗi:', error);
            // Xử lý lỗi (nếu cần)
        });
    });
});

// Hàm kiểm tra số điện thoại hợp lệ (10 số)
function validatePhoneNumber(phoneNumber) {
    var phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phoneNumber);
}
