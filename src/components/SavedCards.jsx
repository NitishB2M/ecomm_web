import { useState } from 'react';

const SavedCards = () => {
  const [cardDialog, setCardDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardForm, setCardForm] = useState({
    card_number: '',
    name_on_card: '',
    expiry_month: '',
    expiry_year: '',
    card_type: 'visa'
  });

  const handleCardChange = (field) => (event) => {
    setCardForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCardDialog = (card = null) => {
    if (card) {
      setSelectedCard(card);
      setCardForm(card);
    } else {
      setSelectedCard(null);
      setCardForm({
        card_number: '',
        name_on_card: '',
        expiry_month: '',
        expiry_year: '',
        card_type: 'visa'
      });
    }
    setCardDialog(true);
  };

  const handleSaveCard = async (e) => {
    e.preventDefault();
    // Implement card save logic here
    setCardDialog(false);
  };

  const handleDeleteCard = async (cardId) => {
    // Implement card delete logic here
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div variant="h5">Saved Cards</div>
        <div
          variant="contained"
          color="primary"
          startIcon={<div />}
          onClick={() => handleCardDialog()}
        >
          Add New Card
        </div>
      </div>

      <div container spacing={3}>
        {cards.map((card) => (
          <div item xs={12} sm={6} key={card.id}>
            <div className="bg-white rounded-lg shadow-md p-4 relative hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-2">
                <div className="mr-2" />
                <div variant="subtitle1" className="font-medium">
                  {card.card_type.toUpperCase()}
                </div>
              </div>
              <div variant="body2" color="textSecondary" className="mb-1">
                **** **** **** {card.card_number.slice(-4)}
              </div>
              <div variant="body2" color="textSecondary" className="mb-2">
                Expires: {card.expiry_month}/{card.expiry_year}
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                <div
                  size="small"
                  onClick={() => handleCardDialog(card)}
                  color="primary"
                >
                  <div />
                </div>
                <div
                  size="small"
                  onClick={() => handleDeleteCard(card.id)}
                  color="error"
                >
                  <div />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div 
        open={cardDialog} 
        onClose={() => setCardDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSaveCard}>
          <div>
            {selectedCard ? 'Edit Card' : 'Add New Card'}
          </div>
          <div>
            <div container spacing={2} className="pt-2">
              <div item xs={12}>
                <div
                  fullWidth
                  label="Card Number"
                  value={cardForm.card_number}
                  onChange={handleCardChange('card_number')}
                  required
                  autoFocus
                />
              </div>
              <div item xs={12}>
                <div
                  fullWidth
                  label="Name on Card"
                  value={cardForm.name_on_card}
                  onChange={handleCardChange('name_on_card')}
                  required
                />
              </div>
              <div item xs={12} sm={6}>
                <div
                  fullWidth
                  label="Expiry Month"
                  value={cardForm.expiry_month}
                  onChange={handleCardChange('expiry_month')}
                  required
                  type="number"
                  inputProps={{ min: 1, max: 12 }}
                />
              </div>
              <div item xs={12} sm={6}>
                <div
                  fullWidth
                  label="Expiry Year"
                  value={cardForm.expiry_year}
                  onChange={handleCardChange('expiry_year')}
                  required
                  type="number"
                  inputProps={{ min: new Date().getFullYear(), max: new Date().getFullYear() + 10 }}
                />
              </div>
              <div item xs={12}>
                <div fullWidth>
                  <div>Card Type</div>
                  <div
                    value={cardForm.card_type}
                    onChange={handleCardChange('card_type')}
                    label="Card Type"
                    required
                  >
                    <div value="visa">Visa</div>
                    <div value="mastercard">Mastercard</div>
                    <div value="amex">American Express</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div onClick={() => setCardDialog(false)}>
              Cancel
            </div>
            <div type="submit" variant="contained" color="primary">
              {selectedCard ? 'Update' : 'Add'} Card
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavedCards;
