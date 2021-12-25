# -*- coding: utf-8 -*-

import sys
import copy
import math
import json
import requests

import numpy as np
import pandas as pd
import urllib3
import scipy
import scipy.sparse
import scipy.sparse.linalg
from sklearn.feature_extraction.text import CountVectorizer  # 피체 벡터화
from sklearn.metrics.pairwise import cosine_similarity  # 코사인 유사도

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


DEBUG = 0
ID_INPUT = int(sys.argv[1])
if len(sys.argv) >= 3:
    DEBUG = int(sys.argv[2])


def main():
    res_url = requests.get(
        "https://13.209.75.222:8080/marketAll", verify=False)
    res_text = res_url.text
    sample_res_to_dict = json.loads(res_text)
    sample_user = '''[{
            "user_id" : 0,
            "name" : "박상연",
            "tag_list" : [2,5,10],
            "like_list": [3, 20 ,28, 50]
        },{
            "user_id" : 1,
            "name" : "김희원",
            "tag_list" : [1,14,18],
            "like_list": [1, 40 ,61, 70]
        },{
            "user_id" : 2,
            "name" : "박정우",
            "tag_list" : [0,4,13],
            "like_list": [5, 14, 28]
    }]'''

    sample_review = '''[{
          "index" : 0,
          "market_id" : 1,
          "user_id" : 0,
          "star_num" : 4,
          "content" : "abc"
        },{
          "index" : 1,
          "market_id" : 34,
          "user_id" : 2,
          "star_num" : 5
        },{
          "index" : 2,
          "market_id" : 28,
          "user_id" : 1,
          "star_num" : 3,
          "content" : "abc"
        },{
          "index" : 3,
          "market_id" : 28,
          "user_id" : 0,
          "star_num" : 5,
          "content" : "abc"
        },{
          "index" : 4,
          "market_id" : 28,
          "user_id" : 2,
          "star_num" : 3,
          "content" : "abc"
        },{
          "index" : 5,
          "market_id" : 80,
          "user_id" : 1,
          "star_num" : 4,
          "content" : "abc"
        },{
          "index" : 6,
          "market_id" : 80,
          "user_id" : 0,
          "star_num" : 4,
          "content" : "abc"
      }]'''

    # sample_res_to_dict = json.loads(sample_res)
    sample_user_to_dict = json.loads(sample_user)
    user_url = requests.get(
        "https://13.209.75.222:8080/userAll", verify=False)
    user_text = user_url.text
    sample_user_to_dict = json.loads(user_text)

    # sample_review_to_dict = json.loads(sample_review)
    review_url = requests.get(
        "https://13.209.75.222:8080/reviewAll", verify=False)
    review_text = review_url.text
    sample_review_to_dict = json.loads(review_text)

    if DEBUG == 1:
        print("sample of users")
        print(sample_user)
        print("make sample of user to dictionary")
        print(sample_user_to_dict)
        print()

    train_data = []

    for i in range(len(sample_review_to_dict)):
        temp = []
        temp.append(sample_review_to_dict[i]['user_id'])  # user id
        temp.append(sample_review_to_dict[i]['market_id'])  # restaurant id
        temp.append(sample_review_to_dict[i]['star_num'])
        train_data.append(temp)
    for i in range(len(sample_user_to_dict)):
        temp_like = sample_user_to_dict[i]['like_list']
        for res in temp_like:
            temp = []
            temp.append(sample_user_to_dict[i]['user_id'])
            temp.append(res)
            temp.append(5)
            train_data.append(temp)
    if DEBUG == 1:
        print("who give star to where")
        print(train_data)
        print()

    train_data_to_pd = pd.DataFrame(train_data)
    train_data_to_pd = train_data_to_pd.rename(
        columns={
            train_data_to_pd.columns[0]: 'user',
            train_data_to_pd.columns[1]: 'restaurant',
            train_data_to_pd.columns[2]: 'rating'
            })

    if DEBUG == 1:
        print("train_data_to_pd")
        print(train_data_to_pd)
        print()
    user_res_rating = train_data_to_pd.pivot_table(
        'rating', index='user', columns='restaurant'
        ).fillna(0)
    if DEBUG == 1:
        print("user restaurant rating")
        print(user_res_rating)
        print()

    user_id_set = set()
    for user in sample_user_to_dict:
        user_id_set.add(user['user_id'])
    for user in sample_review_to_dict:
        user_id_set.add(user['user_id'])
    user_id_list = list(user_id_set)
    user_id_list.sort()
    if DEBUG == 1:
        print("user id set")
        print(user_id_set)
        print("user id list")
        print(user_id_list)
        print()

    matrix = np.zeros((len(user_id_list), len(sample_res_to_dict)))
    for i in range(len(train_data)):
        matrix[user_id_list.index(train_data[i][0])][train_data[i][1]] \
            = train_data[i][2]
    if DEBUG == 1:
        print("matrix")
        print(matrix)
        print()

    # matrix = user_res_rating.to_numpy()

    version = 1  # 0 is mean without 0, 1 is just mean

    if version == 0:
        matrix_mean = np.true_divide(matrix.sum(1), (matrix != 0).sum(1))
        if DEBUG == 1:
            print("matrix mean")
            print(matrix_mean)
            print()
        matrix_user_mean = matrix - matrix_mean.reshape(-1, 1)
    elif version == 1:
        user_res_rating_mean = np.mean(matrix, axis=1)
        if DEBUG == 1:
            print("user_res_rating_mean")
            print(user_res_rating_mean)
            print()
        matrix_user_mean = matrix - user_res_rating_mean.reshape(-1, 1)
    if DEBUG == 1:
        print("matrix_user_mean")
        print(matrix_user_mean)
        print()

    U, sigma, Vt = scipy.sparse.linalg.svds(
        matrix_user_mean,
        k=min(len(user_id_list), len(sample_res_to_dict))-1)
    if DEBUG == 1:
        print("shape of U, sigma, Vt")
        print(U.shape, sigma.shape, Vt.shape)
        print()

    sigma = np.diag(sigma)

    svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt)
    + user_res_rating_mean.reshape(-1, 1)
    if DEBUG == 1:
        print("svd_user_predicted_ratings")
        print(svd_user_predicted_ratings)
        print()

    id_list = []
    for i in range(len(sample_res_to_dict)):
        id_list.append(sample_res_to_dict[i]['id'])

    svd_predict_df = pd.DataFrame(
        svd_user_predicted_ratings,
        columns=id_list,
        index=user_id_list)

    if DEBUG == 1:
        print("svd_predict_df")
        print(svd_predict_df)
        print()
    score_mf = []
    score_mf.append(svd_predict_df.columns)
    score_mf.append(svd_predict_df.loc[ID_INPUT])
    score_mf = np.array(score_mf)
    if DEBUG == 1:
        print("score using MF")
        print(score_mf)
        print()

    tag_array = []
    for i in range(len(sample_res_to_dict)):
        temp = []
        temp.append(sample_res_to_dict[i]['id'])
        temp.append(' '.join(sample_res_to_dict[i]['foodtag']))
        tag_array.append(temp)
    if DEBUG == 1:
        print("tag array")
        print(tag_array)
        print()

    tag_df = pd.DataFrame(
        np.array(tag_array).T[1],
        index=np.array(tag_array).T[0],
        columns=['cate'])
    if DEBUG == 1:
        print("tag dataframe")
        print(tag_df)
        print()

    count_vect_category = CountVectorizer(min_df=0, ngram_range=(1, 1))
    place_category = count_vect_category.fit_transform(tag_df['cate'])
    place_simi_cate = cosine_similarity(place_category, place_category)
    place_simi_cate_sorted_ind = place_simi_cate.argsort()[:, ::-1]

    if DEBUG == 1:
        print("place simi category")
        print(place_simi_cate)
        print()
    # for i in range(len(place_simi_cate[30])):
    # print(place_simi_cate[30][i], place_simi_cate_sorted_ind[30][i])

    how_do_you_review = []
    for i in range(len(sample_review_to_dict)):
        if sample_review_to_dict[i]['user_id'] == ID_INPUT:
            how_do_you_review.append(
                [
                    sample_review_to_dict[i]['market_id'],
                    sample_review_to_dict[i]['star_num']-3
                ])

    score_cs = np.zeros((len(sample_res_to_dict)))
    for element in how_do_you_review:
        score_cs += place_simi_cate[element[0]]*element[1]/2

    # 유저의 취향과 위치를 얻어냄
    for user in sample_user_to_dict:
        if ID_INPUT == user['user_id']:
            user_tag = user['tag_list']
            break

    # 유저의 취향을 이용한 점수 계산
    if user_tag:
        score_tag = np.zeros((len(sample_res_to_dict)))
        for i in range(len(sample_res_to_dict)):
            for tag in user_tag:
                if tag in sample_res_to_dict[i]['foodtag']:
                    score_tag[i] = (score_tag[i]+1) / 2

    else:
        score_tag = np.ones((len(sample_res_to_dict)))

    if max(score_tag) > 0:
        score_tag = score_tag/max(score_tag)
    if DEBUG == 1:
        print("score using tag")
        print(score_tag)
        print()

    # 식당까지의 거리를 이용한 점수 계산
    location_url = requests.get(
        "https://13.209.75.222:8080/mapAll"+str(ID_INPUT), verify=False)
    location_text = location_url.text
    sample_location_to_dict = json.loads(location_text)
    if DEBUG == 1:
        print("sample location to dict")
        print(sample_location_to_dict)
        print()
    user_location = sample_location_to_dict[0]["user"]
    if DEBUG == 1:
        print("user location")
        print(user_location)
        print()

    if user_location:
        score_loc = np.zeros((len(sample_location_to_dict)))
        for i in range(len(sample_location_to_dict)):
            res_location = sample_location_to_dict[i]['market']
            if res_location:
                score_loc[i] = math.sqrt(
                    pow(user_location[0]-res_location[0], 2)
                    + pow(user_location[1]-res_location[1], 2))
        if not np.all((score_loc == 0)):
            score_loc = distance_score(score_loc)
        if DEBUG == 1:
            print("score location")
            print(score_loc)
    else:
        score_loc = np.zeros((len(sample_res_to_dict)))
        if DEBUG == 1:
            print("score location")
            print(score_loc)

    if len(how_do_you_review) != 0:
        score_cs = score_cs/len(how_do_you_review)
        score_cs = (score_cs-min(score_cs))/(max(score_cs)-min(score_cs))
        if DEBUG == 1:
            print("score using CS")
            print(score_cs)
            print()
        score_final = copy.deepcopy(score_mf)
        score_final[1] = (
            score_tag*35
            + score_loc*15
            + (score_mf[1]/max(abs(score_mf[1]))+1)/2*25
            + score_cs/max(score_cs)*25)
    else:
        score_final = copy.deepcopy(score_mf)
        score_final[1] = (
            score_tag*50
            + score_loc*20
            + (score_mf[1]/max(abs(score_mf[1]))+1)/2*30)

    score_final = pd.DataFrame(score_final)
    header = score_final.iloc[0]
    header = header.astype(int)
    score_final = score_final[1:]
    score_final.rename(columns=header, inplace=True)
    if DEBUG == 1:
        print("***********score_final**********")
        print(score_final)
        print()
    final_recommend = recommend_restaurants(
        score_final, ID_INPUT, user_res_rating, 9)

    with open('test.json', 'w') as f:
        f.write(final_recommend)
    # with open('test.json', 'w') as outfile:
    # json.dump(final_recommend, outfile)
    if DEBUG == 1:
        print("final recommend")
        print(final_recommend)
    return final_recommend


def recommend_restaurants(score_final, user_id, user_res_rating, num_row=5):
    score_row = score_final.loc[1].sort_values(ascending=False)
    already_ate = user_res_rating.loc[user_id]
    if DEBUG == 1:
        print("score row sorted")
        print(score_row)
        print("already ate")
        print(already_ate)
        print()
    for a, b in already_ate.items():
        if b != 0:
            score_row = score_row.drop(a)

    count = 0
    for a, b in score_row.items():
        count = count+1
        if count <= num_row:
            continue
        score_row = score_row.drop(a)
    final_recommend = score_row.to_json()
    return final_recommend


def distance_score(dis_array, para=3):
    mean_dis = sum(dis_array)/len(dis_array)
    for i in range(len(dis_array)):
        if dis_array[i] == 0:
            dis_array[i] = mean_dis
    max_dis = max(dis_array)
    min_dis = min(dis_array)
    if max_dis == min_dis:
        return np.ones((len(dis_array)))
    else:
        dis_array = para / 10 / (min_dis-max_dis) * (dis_array - min_dis) + 1
        return dis_array


if __name__ == '__main__':
    main()
