export const showLoading = () => document.getElementById("loadingOverlay").classList.remove("hidden");
export const hideLoading = () => document.getElementById("loadingOverlay").classList.add("hidden");

export const toggleModal = (modalId, show = true) => {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.remove("hidden");
    } else {
        modal.classList.add("hidden");
    }
};

export const resetForm = (fields) => {
    Object.values(fields).forEach(field => {
        if (field) field.value = "";
    });
};