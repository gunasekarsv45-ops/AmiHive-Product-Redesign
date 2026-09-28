import { useState } from 'react';
import '../Account/Account.css';
import { TopTicker, SiteHeader, SiteFooter, navigate, Ico, useToast } from '../Shared/SiteChrome';

const SEED_ADDRESSES = [
  {
    id: 'a1',
    name: 'Priya Sharma',
    type: 'home',
    isDefault: true,
    phone: '+91 98450 12233',
    line: '14, Lakeview Residency, 2nd Cross, Indiranagar',
    city: 'Bengaluru, Karnataka 560038',
  },
  {
    id: 'a2',
    name: 'Priya Sharma',
    type: 'work',
    isDefault: false,
    phone: '+91 98450 12233',
    line: '4th Floor, Prestige Tech Park, Outer Ring Road',
    city: 'Bengaluru, Karnataka 560103',
  },
];

function AddressManagement() {
  const [addresses, setAddresses] = useState(SEED_ADDRESSES);
  const [toastNode, showToast] = useToast();

  const handleSetDefault = (id) => () => {
    setAddresses((cur) => cur.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast('Default address updated.');
  };

  const handleDelete = (id) => () => {
    setAddresses((cur) => cur.filter((a) => a.id !== id));
    showToast('Address removed.');
  };

  const handleEdit = () => navigate('/account?tab=addresses&edit=1');

  return (
    <div className="sx-root ac-root">
      <TopTicker />
      <SiteHeader active="account" onToast={showToast} />

      <div className="sx-wrap">
        <nav className="sx-crumb" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate('/')}>Home</button>
          <span>/</span>
          <strong>Manage addresses</strong>
        </nav>

        <div className="ac-panel" style={{ paddingBottom: 'var(--section-y)' }}>
          <div className="ac-panelhead">
            <h1>Manage addresses</h1>
            <p>{addresses.length} saved address{addresses.length === 1 ? '' : 'es'}</p>
          </div>

          <button type="button" className="ac-addnew" onClick={() => navigate('/account?tab=addresses&new=1')}>
            <Ico name="plus" size={18} /> Add a new address
          </button>

          {addresses.length === 0 ? (
            <div className="ac-empty">
              <Ico name="pin" size={30} />
              <h3>No addresses saved yet</h3>
              <p>Add an address to speed up checkout.</p>
            </div>
          ) : (
            <div className="ac-addrgrid">
              {addresses.map((a) => (
                <div className={`ac-addr ${a.isDefault ? 'is-default' : ''}`} key={a.id}>
                  <header>
                    <span className="ac-badge ac-badge--type">
                      {a.type === 'home' ? 'Home' : a.type === 'work' ? 'Work' : 'Other'}
                    </span>
                    {a.isDefault && <span className="ac-badge ac-badge--delivered">Default</span>}
                  </header>

                  <strong>{a.name}</strong>
                  <p>{a.line}</p>
                  <p>{a.city}</p>
                  <span>{a.phone}</span>

                  <footer>
                    <button type="button" className="sx-linkbtn" onClick={handleEdit}>
                      <Ico name="edit" size={14} /> Edit
                    </button>

                    {!a.isDefault && (
                      <button type="button" className="sx-linkbtn" onClick={handleSetDefault(a.id)}>
                        <Ico name="check" size={14} /> Set as default
                      </button>
                    )}

                    <button type="button" className="sx-linkbtn" style={{ color: 'var(--danger)' }} onClick={handleDelete(a.id)}>
                      <Ico name="trash" size={14} /> Delete
                    </button>
                  </footer>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {toastNode}
      <SiteFooter onToast={showToast} />
    </div>
  );
}

export default AddressManagement;