import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const CopyRight = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'© 2019 My Stream Now. '}
      <Link color='inherit' href='https://mystreamnow.com/'>
        Todos os direitos reservados.
      </Link>
    </Typography>
  );
};

export default CopyRight;
