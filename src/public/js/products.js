console.log("Products frontend javascript file");

$(function () {
  $(".product-collection").on("change", function () {
    const selectedValue = $(this).val();

    if (selectedValue === "DRINK") {
      $("#product-collection").hide();
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });
});

function validateForm() {
  const productName = $(".product-name").val();
  const productPrice = $(".product-price").val();
  const productLeftCount = $(".product-left-count").val();
  const productCollection = $(".product-collection").val();
  const productDesc = $(".product-desc").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === ""
  ) {
    alert("Please insert all details!");
    return false;
  }

  return true;
}

function previewFileHandler(input, order) {
  console.log("input:", input);

  const file = input.files[0];

  if (!file) return;

  const fileType = file.type;

  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg, and png!");
    input.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    $(`#image-section-${order}`).attr("src", reader.result);
  };

  reader.readAsDataURL(file);
}
