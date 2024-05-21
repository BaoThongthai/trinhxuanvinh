$(document).ready(function() {
    // Chọn phần tử muốn áp dụng hiệu ứng
    var element = $("#thuexedulich");
    
    // Áp dụng hiệu ứng swing
    function swingEffect() {
        element.effect("bounce", { times: 1 }, 1000, swingEffect);
    }
    
    // Gọi hàm để bắt đầu hiệu ứng
    swingEffect();
});
