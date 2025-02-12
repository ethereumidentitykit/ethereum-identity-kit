import './ManualAdd.css'

const ManualAdd = () => {
  return (
    <div className="manual-add-container">
      <input type="text" placeholder="ENS name or Address" className="manual-add-input" />
      <button className="manual-add-button">Add</button>
    </div>
  )
}

export default ManualAdd
