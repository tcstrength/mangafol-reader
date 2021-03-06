// export const axiosBaseUrl = "http://localhost:8080/"
export const axiosBaseUrl = "https://mangafol-api.tk/api"
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
      text: 'Chưa rõ',
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

export const getPublicLink = (uname) => {
  return '/public/' + uname;
}

export const mapReadingStatusToColor = (readingStatus) => {
  if (readingStatus === 0) {
    return "#FFF0F0";
  } else if (readingStatus === 2) {
    return "#F0F0FF";
  }

  return "";
}

export const googleSearch = (title) => {
  return "https://www.google.com/search?q=" + title;
}