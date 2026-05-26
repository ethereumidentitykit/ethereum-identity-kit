const Grails: React.FC<{ height: number; width: number }> = ({ height, width }) => {
  return (
    <div
      style={{
        background: '#cccccc',
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
      }}
    >
      <img src="https://grails.app/logo.png" alt="Grails" width={width / 1.8} height={height / 1.5} />
    </div>
  )
}

export default Grails
