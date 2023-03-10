import PopupWithForm from "./PopupWithForm.js"

function RemoveCardPopup({ isOpen, onClose, onRemoveCardPopup, deletedCard }) {
    function handleSubmit(e) {
        e.preventDefault();
        onRemoveCardPopup(deletedCard);
        onClose(true)
    };
    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="confirmation"
            title="Вы уверены?"
            buttonText="Да" />)
}

export default RemoveCardPopup;