export const styles = {
  container: {
    padding: '10px',
    marginRight: '0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '400px',
    height: '600px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  selectContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '20px',
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    appearance: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: '#999',
    },
    ':focus': {
      outline: 'none',
      borderColor: '#0066ff',
      boxShadow: '0 0 0 3px rgba(0,102,255,0.1)',
    },
  },
  selectArrow: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#666',
    fontSize: '12px',
  },
  imageContainer: {
    position: 'relative' as const,
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
   // overflow: 'hidden',
  },
  image: {
    display: 'flex',
    width: '90%',
    height: '90%',
    objectFit: 'contain' as const,
    justifyContent: 'center',
    marginBottom: '0',
    maxWidth: '300px',
    maxHeight: '300px',
  },
  button: {
    bottom: '20px',
    left: '10%',
    backgroundColor: '#0095f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    // zIndex: 10,
    width: '100%',
    //position: 'absolute' as const,
    //  transform: 'translateX(-50%)',
  },
};