// export const axiosBaseUrl = "http://localhost:8080/api"
export const axiosBaseUrl = "https://mangafol-api.herokuapp.com/api"
// https://mangafol-api.herokuapp.com/swagger-ui/index.html

export const mapReadingStatus = (status) => {
  if (status === 1) {
    return {
      text: 'Theo dõi',
      variant: 'success'
    }
  } else if (status === 2) {
    return {
      text: 'Xong',
      variant: 'primary'
    }
  } else {
    return {
      text: 'Ngừng',
      variant: 'danger'
    }
  }
}

export const mapTaleFinished = (finished) => {
  if (!finished) {
    return {
      text: 'Đang viết',
      variant: 'success'
    }
  } else {
    return {
      text: 'Hoàn thành',
      variant: 'primary'
    }
  }
}

export const mapRating = (rating) => {
  if (rating === 0) {
    return {
      text: 'Chưa đánh giá',
      variant: 'secondary'
    }
  }

  var text = `${rating}/10`;
  var variant = 'danger';

  if (rating >= 7) {
    variant = 'success'
  } else if (rating >= 5) {
    variant = 'warning';
  } else if (rating > 0) {
    variant = 'danger'
  }

  return {
    text: text,
    variant: variant
  }
}

export const getTaleLink = (tale) => {
  return '/tales/' + tale.slug;
}